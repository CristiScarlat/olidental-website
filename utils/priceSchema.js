// JSON-LD for the /preturi page: an OfferCatalog with one sub-catalog per
// category and one Offer per row of the clinic price list (utils/tarife).
//
// Prices are in lei only (RON): an Offer carries one currency, and the euro
// column is shown to visitors as information. No FAQPage and no Product: the
// FAQ stays visible text, and a dental service is not a product.
//
// Imports use explicit `.js` so tests can load this file with plain Node.
import { PRICE_CATEGORIES, rowsOf } from './tarife/index.js';
import { PAGE_HEADING } from './tarife/pageText.js';

export const PRICE_CATALOG_PATH = '/preturi';

const CURRENCY = 'RON';

/**
 * A row priced "De la …" is a minimum, a row priced per arch or implant names
 * its unit; both go into a priceSpecification. A plain row is a simple Offer.
 */
function buildPriceFields(row) {
  if (!row.prefix && !row.unit) {
    return { price: row.lei, priceCurrency: CURRENCY };
  }
  return {
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      ...(row.prefix ? { minPrice: row.lei } : { price: row.lei }),
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
    itemListElement: PRICE_CATEGORIES.map((category) => ({
      '@type': 'OfferCatalog',
      '@id': `${pageUrl}#${category.id}`,
      name: category.name,
      url: `${pageUrl}#${category.id}`,
      itemListElement: rowsOf(category).map((row) => buildOffer(row, dentistId)),
    })),
  };
}
