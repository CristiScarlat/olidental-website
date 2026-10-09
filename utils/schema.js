// Schema.org (JSON-LD) builders for Olidental Clinic.
//
// This module derives structured data from the site's existing content
// sources (`utils/uiConstants.js`) instead of duplicating copy here, so it
// stays correct if that content changes. NAP (name/address/phone), opening
// hours and the aggregate rating below were confirmed against the client's
// live Google Business Profile and are intentionally hardcoded constants
// (there is no other source of truth for them in the codebase).
import { services, teamCards, beforeAfter } from './uiConstants';
import { getPageDate } from './pageDates';

export const SITE_URL = 'https://olidental.ro';
export const DENTIST_ID = `${SITE_URL}/#dentist`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LANGUAGE = 'ro-RO';
const SERVICES_HUB_PATH = '/servicii';
const TEAM_PAGE_PATH = '/echipa';
const RESULTS_HUB_PATH = '/rezultate';
const CONTACT_PAGE_PATH = '/contact';
const BLOG_POST_PREFIX = '/blog/';
export const HOME_LABEL = 'Acasă';
const SERVICES_LABEL = 'Servicii';
const RESULTS_LABEL = 'Rezultate';
// Founder, looked up in `teamCards` by title. Founding year confirmed by the
// client (matches the company registration J35/2982/2015 in the footer).
const FOUNDER_TITLE = 'Dr. Olimpiu Ladislau Karancsi';
const FOUNDING_YEAR = '2015';
// Company identifiers, as printed in the footer (components/footer.jsx).
const LEGAL_NAME = 'OLIDENTAL MED SRL';
const TAX_ID = 'RO35302885';
const SERVICE_DESCRIPTION_MAX_LENGTH = 300;

/** Top-level pages with a plain "Acasă / <page>" trail (shown and in JSON-LD). */
const SIMPLE_PAGE_LABELS = {
  [SERVICES_HUB_PATH]: SERVICES_LABEL,
  [RESULTS_HUB_PATH]: RESULTS_LABEL,
  [TEAM_PAGE_PATH]: 'Echipa',
  [CONTACT_PAGE_PATH]: 'Contact',
  '/zambete': 'Zâmbete',
  '/programare': 'Programare',
  '/politica-confidentialitate': 'Politica de confidențialitate',
  '/politica-cookies': 'Politica de cookies',
  '/termen-conditii': 'Termeni și condiții',
};

/** Facts stated in each person's bio on /echipa (utils/uiConstants.js),
 * keyed by `teamCards` title, named the way the bio names them. */
const DENTAL_FACULTY_TIMISOARA = {
  '@type': 'EducationalOrganization',
  name: 'Facultatea de Medicină Dentară din Timișoara',
};
const PERSON_EXTRAS = {
  'Dr. Olimpiu Ladislau Karancsi': {
    affiliation: { '@type': 'CollegeOrUniversity', name: 'UMF „Victor Babeș” Timișoara' },
  },
  'Dr. Ana Strava': { alumniOf: DENTAL_FACULTY_TIMISOARA },
  'Dr. Patricia Străinu': { alumniOf: DENTAL_FACULTY_TIMISOARA },
};

/**
 * The 4 dedicated "results by treatment category" pages under /rezultate/.
 * These are evidence/case-study pages, not service descriptions, so they
 * intentionally get a BreadcrumbList only (no Service schema) — see
 * buildResultsRouteIndex() below.
 */
const RESULTS_CATEGORIES = [
  { slug: 'fatete-coroane-ceramice', label: 'Fațete și coroane ceramice' },
  { slug: 'estetica-gingivala', label: 'Estetică gingivală' },
  { slug: 'implantologie', label: 'Implantologie' },
  { slug: 'reabilitare-orala-completa', label: 'Reabilitare orală completă' },
];

/**
 * Ensures a link from uiConstants.js is a normalized absolute-path string
 * (some entries are authored with a leading slash, some without).
 */
function normalizeLink(link) {
  if (typeof link !== 'string' || link.length === 0) {
    return '';
  }
  return link.startsWith('/') ? link : `/${link}`;
}

/**
 * Strips HTML markup out of the rich-text descriptions stored in
 * uiConstants.js so they are safe/appropriate as plain-text JSON-LD values.
 */
function stripHtml(html) {
  if (typeof html !== 'string') {
    return '';
  }
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * First sentences of a long description, cut at a sentence end so the
 * JSON-LD summary stays readable (Service descriptions run 1,000+ chars).
 */
function summarize(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let summary = '';
  for (const sentence of sentences) {
    const next = `${summary} ${sentence.trim()}`.trim();
    if (next.length > maxLength) {
      break;
    }
    summary = next;
  }
  return summary || `${text.slice(0, maxLength - 1).trim()}…`;
}

function pageUrl(pathname) {
  return pathname === '/' ? SITE_URL : `${SITE_URL}${pathname}`;
}

function buildBreadcrumbTrail(entries) {
  return entries.map(({ label, href }) => ({ label, href }));
}

/**
 * Builds a lookup of pathname -> { title, description, breadcrumb } for
 * every treatment (service) and procedure page, read directly from the
 * `services` array in uiConstants.js.
 */
function buildRouteIndex() {
  const index = new Map();
  const serviceList = Array.isArray(services) ? services : [];

  serviceList.forEach((service) => {
    if (!service || typeof service.link !== 'string') {
      return;
    }

    const serviceHref = normalizeLink(service.link);
    const serviceBreadcrumb = buildBreadcrumbTrail([
      { label: HOME_LABEL, href: '/' },
      { label: SERVICES_LABEL, href: SERVICES_HUB_PATH },
      { label: service.title, href: serviceHref },
    ]);

    index.set(serviceHref, {
      title: service.title,
      description: service.description,
      breadcrumb: serviceBreadcrumb,
      logo: service.logo,
    });

    const procedureList = Array.isArray(service.procedures) ? service.procedures : [];
    procedureList.forEach((procedure) => {
      if (!procedure || typeof procedure.link !== 'string') {
        return;
      }

      const procedureHref = normalizeLink(procedure.link);
      index.set(procedureHref, {
        title: procedure.title,
        description: procedure.description,
        breadcrumb: buildBreadcrumbTrail([
          { label: HOME_LABEL, href: '/' },
          { label: SERVICES_LABEL, href: SERVICES_HUB_PATH },
          { label: service.title, href: serviceHref },
          { label: procedure.title, href: procedureHref },
        ]),
        logo: procedure.logo,
      });
    });
  });

  return index;
}

const routeIndex = buildRouteIndex();

/**
 * Builds a lookup of pathname -> { breadcrumb } for the /rezultate/* result
 * category pages. Kept separate from `routeIndex` on purpose: any entry in
 * `routeIndex` automatically emits a Service schema block (see
 * getSchemaForRoute below), which would be inaccurate here — these pages
 * showcase real case outcomes, not a description of a treatment offering.
 */
function buildResultsRouteIndex() {
  const index = new Map();

  RESULTS_CATEGORIES.forEach(({ slug, label }) => {
    const href = `${RESULTS_HUB_PATH}/${slug}`;
    index.set(href, {
      slug,
      breadcrumb: buildBreadcrumbTrail([
        { label: HOME_LABEL, href: '/' },
        { label: RESULTS_LABEL, href: RESULTS_HUB_PATH },
        { label, href },
      ]),
    });
  });

  return index;
}

const resultsRouteIndex = buildResultsRouteIndex();

function getSimplePageBreadcrumb(pathname) {
  const label = SIMPLE_PAGE_LABELS[pathname];
  return label
    ? buildBreadcrumbTrail([
        { label: HOME_LABEL, href: '/' },
        { label, href: pathname },
      ])
    : null;
}

/** Public Google Maps place link, decoded from the CID already embedded in
 * the /contact page's Maps iframe (components/location.jsx) — not a new
 * lookup, just the same place made linkable. Used both as `hasMap` and as
 * the destination for the visible rating badge (see components/layout.jsx). */
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps?cid=11784310386487343352';

/** The Google Business Profile rating, shown to visitors as plain UI only
 * (never as structured data, see buildDentistSchema). One place to update
 * by hand when the profile's numbers change. */
export const GOOGLE_RATING = { value: '5,0', count: 62 };

/**
 * Sitewide Dentist entity. Confirmed real data (checked 2026-09-17) from the
 * client's live Google Business Profile: address, phone, opening hours.
 * No `priceRange` (no real pricing data exists anywhere in the codebase) and
 * no `aggregateRating` (removed deliberately: schema.org/Google guidance
 * requires an aggregate rating to be backed by visible, linkable `Review`
 * content, which this site does not have — self-declaring one without it is
 * a manual-action risk. The real 5,0/62 figure is still shown to visitors as
 * plain UI, linked to `GOOGLE_MAPS_URL`, just not asserted as structured
 * data.) `image`/`geo` reuse assets and coordinates already on the site.
 */
export function getFounder() {
  return Array.isArray(teamCards)
    ? teamCards.find((member) => member && member.title === FOUNDER_TITLE) || null
    : null;
}

/** Short typed reference to a team member, enough to stand on its own on
 * pages that don't carry the full Person nodes (only /echipa does). */
function personReference(member) {
  return {
    '@type': 'Person',
    '@id': personId(member),
    name: member.title,
    url: personId(member),
  };
}

/**
 * `employee` is listed only where the Person nodes it points to are emitted
 * (/echipa); everywhere else it would be 9 references to nothing.
 */
export function buildDentistSchema({ includeEmployees = false } = {}) {
  const founder = getFounder();
  const team = Array.isArray(teamCards) ? teamCards : [];
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': DENTIST_ID,
    name: 'Olidental Clinic',
    legalName: LEGAL_NAME,
    taxID: TAX_ID,
    description:
      'Clinică stomatologică din Timișoara, fondată în 2015: implantologie, fațete și coroane ceramice, reabilitări orale complexe și tratamente multidisciplinare.',
    url: SITE_URL,
    image: `${SITE_URL}/images/og/olidental-clinic-1200x630.jpg`,
    logo: `${SITE_URL}/images/logo-olidental-clinic.jpg`,
    telephone: '+40733023030',
    email: 'clinica@olidental.ro',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Ștefan cel Mare 53, Parter (intrare de pe Gh. Asachi)',
      addressLocality: 'Timișoara',
      addressRegion: 'Timiș',
      postalCode: '307200',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.7512815,
      longitude: 21.2523657,
    },
    hasMap: GOOGLE_MAPS_URL,
    foundingDate: FOUNDING_YEAR,
    areaServed: { '@type': 'City', name: 'Timișoara' },
    knowsLanguage: 'ro',
    ...(founder ? { founder: personReference(founder) } : {}),
    ...(includeEmployees && team.length > 0
      ? { employee: team.map((member) => ({ '@id': personId(member) })) }
      : {}),
    sameAs: [
      'https://www.facebook.com/OlidentalClinic/',
      'https://www.instagram.com/olidental.clinic/',
      'https://www.youtube.com/@OlidentalClinic',
      GOOGLE_MAPS_URL,
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '18:30',
      },
    ],
    medicalSpecialty: 'https://schema.org/Dentistry',
  };
}

function buildServiceSchema(routeEntry, pathname) {
  const url = `${SITE_URL}${pathname}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: routeEntry.title,
    description: summarize(stripHtml(routeEntry.description), SERVICE_DESCRIPTION_MAX_LENGTH),
    url,
    ...(routeEntry.logo ? { image: `${SITE_URL}${routeEntry.logo}` } : {}),
    serviceType: routeEntry.title,
    areaServed: {
      '@type': 'City',
      name: 'Timișoara',
    },
    provider: { '@id': DENTIST_ID },
    // The page's date lives on its WebPage node: Service has no dateModified.
  };
}

function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Olidental Clinic',
    inLanguage: LANGUAGE,
    publisher: { '@id': DENTIST_ID },
  };
}

/**
 * The page itself, with its real last-change date (utils/pageDates.js) so
 * date extractors stop reading the footer's "Copyright <year>" as one.
 */
function buildWebPageSchema(pathname, meta, { type = 'WebPage', hasBreadcrumb = false, extra = {} } = {}) {
  const url = meta.url || pageUrl(pathname);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    ...(meta.title ? { name: meta.title } : {}),
    ...(meta.description ? { description: meta.description } : {}),
    inLanguage: LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': DENTIST_ID },
    dateModified: getPageDate(pathname),
    ...(hasBreadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...extra,
  };
}

/**
 * ImageObject entries for the /rezultate/* before-after galleries — the
 * site's most persuasive content, previously carrying no structured
 * representation at all. `pairIndex` keeps @id unique per image pair within
 * a page (each case can have more than one before/after pair).
 */
export function buildResultImageObjects(pathname, caseTitle, pairIndex, beforeSrc, afterSrc) {
  const pageUrl = `${SITE_URL}${normalizeLink(pathname)}`;
  const base = `${pageUrl}#caz-${pairIndex}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      '@id': `${base}-inainte`,
      contentUrl: `${SITE_URL}${beforeSrc}`,
      caption: `${caseTitle}, înainte de tratament`,
      representativeOfPage: false,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      '@id': `${base}-dupa`,
      contentUrl: `${SITE_URL}${afterSrc}`,
      caption: `${caseTitle}, după tratament`,
      representativeOfPage: false,
    },
  ];
}

/**
 * Builds the full set of ImageObject pairs for a /rezultate/<slug> category
 * page, derived from the same `beforeAfter` case data the page itself
 * renders — one before/after pair per image batch, using the fixed
 * `/images/beforeAfter/thumbnail_*` path every /rezultate/* page uses.
 * A batch of 3 images (before/during/after) still yields a before/after
 * pair, taking the first and last frame.
 */
function buildResultsImageObjects(pathname, categorySlug) {
  const cases = Array.isArray(beforeAfter)
    ? beforeAfter.filter((item) => item && item.resultCategory === categorySlug)
    : [];

  const objects = [];
  cases.forEach((caseItem, caseIndex) => {
    const batches = Array.isArray(caseItem.images) ? caseItem.images : [];
    batches.forEach((batch, batchIndex) => {
      if (!Array.isArray(batch) || batch.length < 2) {
        return;
      }
      const beforeSrc = `/images/beforeAfter/thumbnail_${batch[0]}`;
      const afterSrc = `/images/beforeAfter/thumbnail_${batch[batch.length - 1]}`;
      objects.push(
        ...buildResultImageObjects(pathname, caseItem.title, `${caseIndex}-${batchIndex}`, beforeSrc, afterSrc)
      );
    });
  });

  return objects;
}

/** `pathname` (optional) gives the list an @id the page's WebPage can point to. */
export function buildBreadcrumbSchema(breadcrumbItems, pathname) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(pathname ? { '@id': `${pageUrl(pathname)}#breadcrumb` } : {}),
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      // Same form as the canonical and the Dentist url: no trailing slash on home.
      item: pageUrl(item.href),
    })),
  };
}

/** URL-safe anchor for a team member, e.g. "Dr. Diana Rada Bârsan" ->
 * "diana-rada-barsan". /echipa puts it on each member's block. */
export function personSlug(member) {
  return member.title
    .replace(/^(Dr|As)\.\s*/i, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function personId(member) {
  return `${SITE_URL}${TEAM_PAGE_PATH}#${personSlug(member)}`;
}

export function buildPersonSchema(member) {
  const specializations = Array.isArray(member.specializations) ? member.specializations.map((s) => s.trim()) : [];
  const knowsAbout = Array.isArray(member.services) ? member.services.filter(Boolean) : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(member),
    name: member.title,
    url: personId(member),
    ...(specializations.length > 0 ? { jobTitle: specializations[0] } : {}),
    ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
    ...(member.thumbnail ? { image: `${SITE_URL}${member.thumbnail}` } : {}),
    worksFor: { '@id': DENTIST_ID },
    ...(PERSON_EXTRAS[member.title] || {}),
  };
}

/**
 * Returns the list of schema.org objects (plain JS objects, ready for
 * JSON.stringify) that should be emitted for a given route pathname.
 * Always includes exactly one Dentist entity.
 */
/**
 * Route-specific nodes: Service + breadcrumb on treatment pages, breadcrumb +
 * photos on /rezultate/*, the team's Person nodes on /echipa, a breadcrumb on
 * the other top-level pages.
 */
function getRouteNodes(pathname) {
  const routeEntry = routeIndex.get(pathname);
  if (routeEntry) {
    return [buildServiceSchema(routeEntry, pathname), buildBreadcrumbSchema(routeEntry.breadcrumb, pathname)];
  }

  const resultsEntry = resultsRouteIndex.get(pathname);
  if (resultsEntry) {
    return [
      buildBreadcrumbSchema(resultsEntry.breadcrumb, pathname),
      ...buildResultsImageObjects(pathname, resultsEntry.slug),
    ];
  }

  const simpleBreadcrumb = getSimplePageBreadcrumb(pathname);
  const breadcrumbNodes = simpleBreadcrumb ? [buildBreadcrumbSchema(simpleBreadcrumb, pathname)] : [];
  if (pathname === TEAM_PAGE_PATH) {
    const teamMembers = Array.isArray(teamCards) ? teamCards : [];
    return [...breadcrumbNodes, ...teamMembers.map(buildPersonSchema)];
  }
  return breadcrumbNodes;
}

/**
 * Returns the list of schema.org objects (plain JS objects, ready for
 * JSON.stringify) that should be emitted for a given route pathname.
 * Always includes exactly one Dentist entity and the WebSite. `meta` is the
 * page's { title, description, url (canonical), noindex } from its `.seo`.
 */
export function getSchemaForRoute(pathname, meta = {}) {
  const normalizedPathname = typeof pathname === 'string' && pathname.length > 0 ? normalizeLink(pathname) : '';
  const dentist = buildDentistSchema({ includeEmployees: normalizedPathname === TEAM_PAGE_PATH });
  const base = [dentist, buildWebSiteSchema()];

  // No page node for the 404 page, and blog posts bring their own WebPage
  // (utils/blogSchema.js).
  if (!normalizedPathname || meta.noindex || normalizedPathname.startsWith(BLOG_POST_PREFIX)) {
    return base;
  }

  const routeNodes = getRouteNodes(normalizedPathname);
  const hasBreadcrumb = routeNodes.some((node) => node['@type'] === 'BreadcrumbList');
  const webPage =
    normalizedPathname === CONTACT_PAGE_PATH
      ? buildWebPageSchema(normalizedPathname, meta, {
          type: 'ContactPage',
          hasBreadcrumb,
          extra: { mainEntity: { '@id': DENTIST_ID } },
        })
      : buildWebPageSchema(normalizedPathname, meta, { hasBreadcrumb });

  return [...base, webPage, ...routeNodes];
}

/**
 * Returns the visible breadcrumb trail ({ label, href }[]) for every page
 * except the homepage (and the blog, which builds its own), or null.
 */
export function getBreadcrumbItems(pathname) {
  if (typeof pathname !== 'string' || pathname.length === 0) {
    return null;
  }

  const normalizedPathname = normalizeLink(pathname);
  const routeEntry = routeIndex.get(normalizedPathname);
  if (routeEntry) {
    return routeEntry.breadcrumb;
  }

  const resultsEntry = resultsRouteIndex.get(normalizedPathname);
  if (resultsEntry) {
    return resultsEntry.breadcrumb;
  }

  return getSimplePageBreadcrumb(normalizedPathname);
}
