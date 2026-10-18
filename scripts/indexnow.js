#!/usr/bin/env node
/**
 * Tells the IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) which
 * olidental.ro pages changed, so they recrawl them soon instead of waiting
 * for their next visit. Google doesn't use IndexNow.
 *
 * The key is public by design: public/<key>.txt serves it at the site root
 * to prove we own the host. Run this only AFTER a deploy is live (DigitalOcean
 * goes live ~7 min after a push to main), since the engines fetch the pages
 * shortly after the ping.
 *
 * URLs come from the live sitemap, so only deployed pages are sent. Send only
 * pages whose content changed: resubmitting unchanged pages gets the key
 * throttled (HTTP 429). `--since` reads the sitemap <lastmod>, which comes
 * from utils/pageDates.js.
 *
 * Usage:
 *   npm run indexnow -- --since 2026-10-18     sitemap pages with lastmod >= date
 *   npm run indexnow -- /blog/new-post /rezultate   specific pages (also removed ones)
 *   npm run indexnow -- --all                  every sitemap page (first submission)
 *   add --dry-run to list the URLs without sending them
 */
const SITE_URL = (process.env.SITE_URL || 'https://olidental.ro').replace(/\/$/, '');
const HOST = new URL(SITE_URL).host;
const INDEXNOW_KEY = 'ec31499b1cc2439d89371a7eac70a6b5';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
// Shared endpoint: every participating engine receives the submission.
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10000;

const KNOWN_FLAGS = ['--all', '--since', '--dry-run'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const USAGE = 'Usage: npm run indexnow -- (--since YYYY-MM-DD | --all | <path>...) [--dry-run]';

const ERROR_MEANINGS = {
  400: 'bad request, invalid format',
  403: 'key not valid: key file missing or its content differs from the key',
  422: 'URLs not on the host, or the key does not match the protocol schema',
  429: 'too many requests, stop resubmitting unchanged pages',
};

function parseArgs(argv) {
  const sinceAt = argv.indexOf('--since');
  const since = sinceAt === -1 ? null : argv[sinceAt + 1];
  const rest = argv.filter((_, i) => sinceAt === -1 || (i !== sinceAt && i !== sinceAt + 1));
  const flags = rest.filter((arg) => arg.startsWith('--'));
  const unknown = flags.filter((flag) => !KNOWN_FLAGS.includes(flag));

  if (unknown.length > 0) throw new Error(`Unknown option ${unknown.join(', ')}\n${USAGE}`);
  if (sinceAt !== -1 && !DATE_PATTERN.test(since || '')) {
    throw new Error(`--since needs a date like 2026-10-18\n${USAGE}`);
  }

  const options = {
    all: flags.includes('--all'),
    dryRun: flags.includes('--dry-run'),
    since,
    paths: rest.filter((arg) => !arg.startsWith('--')),
  };
  const modeCount = [options.all, options.since !== null, options.paths.length > 0].filter(Boolean).length;
  if (modeCount !== 1) throw new Error(USAGE);
  return options;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`GET ${url} returned HTTP ${response.status}`);
  return response.text();
}

function firstTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return match ? match[1].trim().replace(/&amp;/g, '&') : null;
}

function blocks(xml, tag) {
  return [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'))].map((match) => match[1]);
}

// next-sitemap writes sitemap.xml as an index of sitemap-0.xml, sitemap-1.xml...
async function fetchSitemapEntries() {
  const root = await fetchText(SITEMAP_URL);
  const documents = root.includes('<sitemapindex')
    ? await Promise.all(blocks(root, 'sitemap').map((block) => fetchText(firstTag(block, 'loc'))))
    : [root];
  return documents
    .flatMap((xml) =>
      blocks(xml, 'url').map((block) => ({ url: firstTag(block, 'loc'), lastmod: firstTag(block, 'lastmod') }))
    )
    .filter((entry) => entry.url);
}

function toSiteUrl(pathOrUrl) {
  const url = new URL(pathOrUrl, SITE_URL);
  if (url.host !== HOST) throw new Error(`${pathOrUrl} is not on ${HOST}, IndexNow would reject it`);
  return url.href;
}

async function selectUrls(options) {
  if (options.paths.length > 0) return [...new Set(options.paths.map(toSiteUrl))];

  const entries = await fetchSitemapEntries();
  const selected = options.all
    ? entries
    : entries.filter((entry) => entry.lastmod && entry.lastmod.slice(0, 10) >= options.since);
  return selected.map((entry) => entry.url);
}

// IndexNow answers 403 when the key file isn't live, so check it first.
async function assertKeyFileIsLive() {
  const response = await fetch(KEY_LOCATION);
  const body = response.ok ? (await response.text()).trim() : '';
  if (body !== INDEXNOW_KEY) {
    throw new Error(
      `${KEY_LOCATION} doesn't serve the key (HTTP ${response.status}). Deploy public/${INDEXNOW_KEY}.txt first.`
    );
  }
}

async function submit(urls) {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  // 202 means accepted while the engine still validates the key.
  if (response.status !== 200 && response.status !== 202) {
    const detail = ERROR_MEANINGS[response.status] || (await response.text());
    throw new Error(`IndexNow returned HTTP ${response.status}: ${detail}`);
  }
  return response.status;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const urls = await selectUrls(options);

  if (urls.length === 0) {
    console.log(
      options.since
        ? `No sitemap page has lastmod >= ${options.since}. Was utils/pageDates.js updated and deployed?`
        : `${SITEMAP_URL} lists no pages.`
    );
    return;
  }
  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`${urls.length} URLs, IndexNow accepts at most ${MAX_URLS_PER_REQUEST} per request`);
  }

  console.log(`${urls.length} URL(s):\n  ${urls.join('\n  ')}`);
  if (options.dryRun) {
    console.log('Dry run, nothing sent.');
    return;
  }

  await assertKeyFileIsLive();
  const status = await submit(urls);
  console.log(`Sent to IndexNow (HTTP ${status}).`);
}

main().catch((error) => {
  // fetch() reports network failures as "fetch failed" with the reason in `cause`.
  console.error(error.cause ? `${error.message}: ${error.cause.message || error.cause}` : error.message);
  process.exitCode = 1;
});
