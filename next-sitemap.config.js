const SERVICE_PAGES = ['/estetica-zambetului', '/implantologie', '/reabilitari-orale-complexe'];

const PROCEDURE_PAGES = [
  '/fatete-coroane-ceramice',
  '/inserare-implant-aditii-os',
  '/restaurari-protetice',
  '/restaurari-protetice-dentare',
  '/restaurari-extinse-dinti-naturali-implanturi',
  '/tratamente-multidisciplinare',
];

const BLOG_INDEX_PAGE = '/blog';
const BLOG_POST_PREFIX = '/blog/';

const LEGAL_PAGES =['/politica-confidentialitate', '/politica-cookies', '/termen-conditii'];

const RESULTS_HUB_PAGE = '/rezultate';

const RESULTS_CATEGORY_PAGES = [
  '/rezultate/fatete-coroane-ceramice',
  '/rezultate/estetica-gingivala',
  '/rezultate/implantologie',
  '/rezultate/reabilitare-orala-completa',
];

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://olidental.ro',
  generateRobotsTxt: false, // (optional)
  exclude: ['/admin'],
  autoLastmod: false,
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'monthly';
    } else if (SERVICE_PAGES.includes(path)) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (PROCEDURE_PAGES.includes(path)) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path === RESULTS_HUB_PAGE) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (RESULTS_CATEGORY_PAGES.includes(path)) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path === BLOG_INDEX_PAGE) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path.startsWith(BLOG_POST_PREFIX)) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (LEGAL_PAGES.includes(path)) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // ...other options
}
