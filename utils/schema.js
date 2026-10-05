// Schema.org (JSON-LD) builders for Olidental Clinic.
//
// This module derives structured data from the site's existing content
// sources (`utils/uiConstants.js`) instead of duplicating copy here, so it
// stays correct if that content changes. NAP (name/address/phone), opening
// hours and the aggregate rating below were confirmed against the client's
// live Google Business Profile and are intentionally hardcoded constants
// (there is no other source of truth for them in the codebase).
import { services, teamCards, beforeAfter } from './uiConstants';

export const SITE_URL = 'https://olidental.ro';
export const DENTIST_ID = `${SITE_URL}/#dentist`;
const SERVICES_HUB_PATH = '/servicii';
const TEAM_PAGE_PATH = '/echipa';
const RESULTS_HUB_PATH = '/rezultate';
const CONTACT_PAGE_PATH = '/contact';
export const HOME_LABEL = 'Acasa';
const SERVICES_LABEL = 'Servicii';
const RESULTS_LABEL = 'Rezultate';
// Founder, looked up in `teamCards` by title. Founding year confirmed by the
// client (matches the company registration J35/2982/2015 in the footer).
const FOUNDER_TITLE = 'Dr. Olimpiu Ladislau Karancsi';
const FOUNDING_YEAR = '2015';

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

export function buildDentistSchema() {
  const founder = getFounder();
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': DENTIST_ID,
    name: 'Olidental Clinic',
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
    ...(founder ? { founder: { '@id': personId(founder) } } : {}),
    ...(Array.isArray(teamCards) && teamCards.length > 0
      ? { employee: teamCards.map((member) => ({ '@id': personId(member) })) }
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
    description: stripHtml(routeEntry.description),
    url,
    ...(routeEntry.logo ? { image: `${SITE_URL}${routeEntry.logo}` } : {}),
    serviceType: routeEntry.title,
    areaServed: {
      '@type': 'City',
      name: 'Timișoara',
    },
    provider: { '@id': DENTIST_ID },
    // Real date this content was last substantively edited — updated by hand
    // when a page's copy actually changes, not auto-generated at build time.
    dateModified: '2026-09-18',
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

export function buildBreadcrumbSchema(breadcrumbItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function personId(member) {
  return `${SITE_URL}/echipa#${encodeURIComponent(member.title)}`;
}

export function buildPersonSchema(member) {
  const specializations = Array.isArray(member.specializations) ? member.specializations : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(member),
    name: member.title,
    ...(specializations.length > 0 ? { jobTitle: specializations[0] } : {}),
    ...(member.thumbnail ? { image: `${SITE_URL}${member.thumbnail}` } : {}),
    worksFor: { '@id': DENTIST_ID },
  };
}

/**
 * Returns the list of schema.org objects (plain JS objects, ready for
 * JSON.stringify) that should be emitted for a given route pathname.
 * Always includes exactly one Dentist entity.
 */
export function getSchemaForRoute(pathname) {
  const dentist = buildDentistSchema();

  if (typeof pathname !== 'string' || pathname.length === 0) {
    return [dentist];
  }

  const normalizedPathname = normalizeLink(pathname);
  const routeEntry = routeIndex.get(normalizedPathname);

  if (routeEntry) {
    return [
      dentist,
      buildServiceSchema(routeEntry, normalizedPathname),
      buildBreadcrumbSchema(routeEntry.breadcrumb),
    ];
  }

  const resultsEntry = resultsRouteIndex.get(normalizedPathname);
  if (resultsEntry) {
    return [
      dentist,
      buildBreadcrumbSchema(resultsEntry.breadcrumb),
      ...buildResultsImageObjects(normalizedPathname, resultsEntry.slug),
    ];
  }

  if (normalizedPathname === TEAM_PAGE_PATH) {
    const teamMembers = Array.isArray(teamCards) ? teamCards : [];
    return [dentist, ...teamMembers.map(buildPersonSchema)];
  }

  if (normalizedPathname === CONTACT_PAGE_PATH) {
    return [
      dentist,
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${SITE_URL}${CONTACT_PAGE_PATH}#contactpage`,
        name: 'Contact Olidental Clinic Timișoara',
        url: `${SITE_URL}${CONTACT_PAGE_PATH}`,
        about: { '@id': DENTIST_ID },
        mainEntity: { '@id': DENTIST_ID },
      },
    ];
  }

  return [dentist];
}

/**
 * Returns the visible breadcrumb trail ({ label, href }[]) for service and
 * procedure pages, or null for every other route (breadcrumbs are only
 * rendered on those pages).
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
  return resultsEntry ? resultsEntry.breadcrumb : null;
}
