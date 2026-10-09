// Last date each page's visible content really changed (YYYY-MM-DD). Both the
// sitemap's <lastmod> (next-sitemap.config.js) and the pages' JSON-LD
// `dateModified` (utils/schema.js) read from here, so update the entry by hand
// whenever a page's copy changes. Don't bump it for layout or metadata-only
// edits: search engines trust lastmod less when it moves without real changes.
// Blog posts keep their dates in utils/blogPosts.js; mirror them here.
//
// Plain CommonJS on purpose: next-sitemap loads its config with require().

// Every page was rewritten in the redesign that went live on this date.
const SITE_LAUNCH_DATE = '2026-10-05';

const PAGE_DATES = {
  // Same as `dateModified` of each post in utils/blogPosts.js.
  '/blog/de-ce-sa-alegi-olidental-clinic': '2026-10-05',
  '/blog/povestea-olidental-clinic': '2026-10-05',
  // Case texts restored to the clinic's own wording.
  '/rezultate': '2026-10-09',
  '/rezultate/fatete-coroane-ceramice': '2026-10-09',
  '/rezultate/estetica-gingivala': '2026-10-09',
  '/rezultate/implantologie': '2026-10-09',
  '/rezultate/reabilitare-orala-completa': '2026-10-09',
};

function getPageDate(path) {
  return PAGE_DATES[path] || SITE_LAUNCH_DATE;
}

module.exports = { getPageDate };
