// JSON-LD for the /tarife page: an OfferCatalog with one sub-catalog per
// group and one Offer per row of the clinic price list (utils/tarife).
//
// Prices are in euro (EUR), as the clinic document gives them. No FAQPage and
// no Product: the FAQ stays visible text, and a dental service is not a product.
//
// Imports use explicit `.js` so tests can load this file with plain Node.
import { PRICE_GROUPS } from './tarife/index.js';
import { PAGE_HEADING } from './tarife/pageText.js';

export const PRICE_CATALOG_PATH = '/tarife';

const CURRENCY = 'EUR';

/** "de la 550" is a minimum, "65–110" has both ends, anything else is one fixed price. */
function priceNumbers(row) {
  if (row.max !== undefined) {
    return { minPrice: row.min, maxPrice: row.max };
  }
  return row.from ? { minPrice: row.min } : { price: row.min };
}

/**
 * A plain row is a simple Offer. A row that is a minimum, a range or priced per
 * arch, tooth or implant goes into a priceSpecification (with its unit if any).
 */
function buildPriceFields(row) {
  if (!row.from && row.max === undefined && !row.unit) {
    return { price: row.min, priceCurrency: CURRENCY };
  }
  return {
    priceSpecification: {
      '@type': row.unit ? 'UnitPriceSpecification' : 'PriceSpecification',
      ...priceNumbers(row),
      priceCurrency: CURRENCY,
      ...(row.unit ? { unitText: row.unit } : {}),
    },
  };
}

function buildOffer(row, dentistId) {
  return {
    '@type': 'Offer',
    name: row.name,
    ...buildPriceFields(row),
    itemOffered: { '@type': 'Service', name: row.name },
    seller: { '@id': dentistId },
  };
}

export function buildPriceCatalogSchema({ siteUrl = 'https://olidental.ro', dentistId = `${siteUrl}/#dentist` } = {}) {
  const pageUrl = `${siteUrl}${PRICE_CATALOG_PATH}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${pageUrl}#catalog`,
    name: PAGE_HEADING,
    url: pageUrl,
    itemListElement: PRICE_GROUPS.map((group) => ({
      '@type': 'OfferCatalog',
      '@id': `${pageUrl}#${group.id}`,
      name: group.name,
      url: `${pageUrl}#${group.id}`,
      itemListElement: group.rows.map((row) => buildOffer(row, dentistId)),
    })),
  };
}
