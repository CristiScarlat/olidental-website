// Last date each page's visible content really changed (YYYY-MM-DD). Both the
// sitemap's <lastmod> (next-sitemap.config.js) and the pages' JSON-LD
// `dateModified` (utils/schema.js) read from here, so update the entry by hand
// whenever a page's copy changes. Don't bump it for layout or metadata-only
// edits: search engines trust lastmod less when it moves without real changes.
// Once the change is live, `npm run indexnow -- --since <that date>` pings
// Bing and the other IndexNow engines (scripts/indexnow.js).
// Blog posts keep their dates in utils/blogPosts.js; mirror them here.
//
// Plain CommonJS on purpose: next-sitemap loads its config with require().

// Every page was rewritten in the redesign that went live on this date.
const SITE_LAUNCH_DATE = '2026-10-05';

const PAGE_DATES = {
  // Same as `dateModified` of each post in utils/blogPosts.js.
  '/blog/de-ce-sa-alegi-olidental-clinic': '2026-10-05',
  '/blog/povestea-olidental-clinic': '2026-10-05',
  // Case texts restored to the clinic's own wording (2026-10-09), then the
  // closing CTA heading and one step reworded (2026-10-18).
  '/rezultate': '2026-10-18',
  // Category intros softened, case sentences restored (AI-search stage 1).
  '/rezultate/fatete-coroane-ceramice': '2026-10-18',
  '/rezultate/estetica-gingivala': '2026-10-18',
  '/rezultate/implantologie': '2026-10-18',
  '/rezultate/reabilitare-orala-completa': '2026-10-18',
  // AI-search stage 1: clinic facts on home and contact, lead sentences,
  // question headings and visible update date on the treatment pages.
  '/': '2026-10-18',
  '/contact': '2026-10-18',
  '/servicii': '2026-10-18',
  '/implantologie': '2026-10-18',
  '/estetica-zambetului': '2026-10-18',
  '/reabilitari-orale-complexe': '2026-10-18',
  '/fatete-coroane-ceramice': '2026-10-18',
  '/inserare-implant-aditii-os': '2026-10-18',
  '/restaurari-protetice': '2026-10-18',
  '/restaurari-protetice-dentare': '2026-10-18',
  '/restaurari-extinse-dinti-naturali-implanturi': '2026-10-18',
  '/tratamente-multidisciplinare': '2026-10-18',
  // Doctors' own pages (utils/doctorProfiles.js), and /echipa now linking to them.
  '/echipa': '2026-10-18',
  '/echipa/olimpiu-ladislau-karancsi': '2026-10-18',
  '/echipa/paula-derban': '2026-10-18',
  '/echipa/anda-nicola': '2026-10-18',
};

function getPageDate(path) {
  return PAGE_DATES[path] || SITE_LAUNCH_DATE;
}

module.exports = { getPageDate };
