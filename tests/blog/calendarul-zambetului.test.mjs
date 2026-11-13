import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { getPostBySlug, getAllPosts } from '../../utils/blogPosts.js';
import { TARIFE_LINK_LABEL, TARIFE_LINK_HREF } from '../../utils/tarifeLink.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(import.meta.url);
const { getPageDate } = require('../../utils/pageDates.js');

const SLUG = 'calendarul-zambetului-de-mireasa';
const post = getPostBySlug(SLUG);

// Wording the CMSR advertising guide bans, checked in the copy WE wrote around
// the clinic's text (takeaways, FAQ, titles). The clinic's own article body is
// kept word for word and is not checked here.
const BANNED = [/\bde la\b/i, /gratuit/i, /promo/i, /ofert/i, /reducer/i, /discount/i, /pachet/i, /garan/i, /premium/i, /cel mai bun/i, /cele mai bune/i];

const authoredCopy = () => [
  post.seoTitle,
  post.description,
  post.excerpt,
  ...post.keyTakeaways,
  ...post.faq.flatMap((item) => [item.question, item.answer, item.link?.label ?? '']),
];

const fileExists = (rel) => fs.existsSync(path.join(ROOT, rel));

test('the article is registered, newest first, with a page file', () => {
  assert.equal(getAllPosts()[0].slug, SLUG);
  assert.ok(fileExists(`pages/blog/${SLUG}.js`));
});

test('title tag and description fit the search result snippet', () => {
  assert.ok(post.seoTitle.length <= 60, `seoTitle is ${post.seoTitle.length} characters`);
  assert.ok(post.description.length >= 70 && post.description.length <= 160, `description is ${post.description.length}`);
  assert.match(post.datePublished, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(post.dateModified, post.datePublished);
});

test('every image the article names exists on disk', () => {
  const { src, srcSet, og } = post.heroImage;
  const files = [src, og, ...srcSet.split(',').map((entry) => entry.trim().split(' ')[0])];
  for (const file of files) {
    assert.ok(fileExists(path.join('public', file)), `missing ${file}`);
  }
});

test('the copy written around the clinic text avoids banned advertising wording', () => {
  for (const text of authoredCopy()) {
    for (const pattern of BANNED) {
      assert.doesNotMatch(text, pattern, `"${text.slice(0, 60)}…" matches ${pattern}`);
    }
  }
});

test('every FAQ link points to a page that exists', () => {
  for (const { link } of post.faq) {
    if (!link) continue;
    assert.ok(fileExists(`pages${link.href}.js`), `no page for ${link.href}`);
  }
});

test('the sitemap date and llms.txt know the article', () => {
  assert.equal(getPageDate(`/blog/${SLUG}`), post.dateModified);
  const llms = fs.readFileSync(path.join(ROOT, 'public/llms.txt'), 'utf8');
  assert.ok(llms.includes(`https://olidental.ro/blog/${SLUG}`));
});

test('the "tarife și prețuri" link ends every treatment page', () => {
  assert.equal(TARIFE_LINK_HREF, '/tarife');
  assert.match(TARIFE_LINK_LABEL, /tarifele/i);
  assert.match(TARIFE_LINK_LABEL, /prețurile/i);
  const treatmentPages = [
    'estetica-zambetului',
    'implantologie',
    'reabilitari-orale-complexe',
    'fatete-coroane-ceramice',
    'inserare-implant-aditii-os',
    'restaurari-protetice',
    'restaurari-protetice-dentare',
    'restaurari-extinse-dinti-naturali-implanturi',
    'tratamente-multidisciplinare',
  ];
  for (const page of treatmentPages) {
    const source = fs.readFileSync(path.join(ROOT, `pages/${page}.js`), 'utf8');
    assert.match(source, /<TarifeLink \/>/, `${page} has no TarifeLink`);
  }
});
