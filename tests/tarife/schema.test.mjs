import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPriceCatalogSchema, PRICE_CATALOG_PATH } from '../../utils/priceSchema.js';
import { PRICE_CATEGORIES, ALL_PRICE_ROWS } from '../../utils/tarife/index.js';

const SITE = 'https://olidental.ro';
const DENTIST = `${SITE}/#dentist`;
const catalog = buildPriceCatalogSchema({ siteUrl: SITE, dentistId: DENTIST });
const offers = catalog.itemListElement.flatMap((category) => category.itemListElement);

test('the catalog is one OfferCatalog with a sub-catalog per category', () => {
  assert.equal(catalog['@context'], 'https://schema.org');
  assert.equal(catalog['@type'], 'OfferCatalog');
  assert.equal(catalog['@id'], `${SITE}${PRICE_CATALOG_PATH}#catalog`);
  assert.equal(catalog.itemListElement.length, PRICE_CATEGORIES.length);
  for (const [index, category] of catalog.itemListElement.entries()) {
    assert.equal(category['@type'], 'OfferCatalog');
    assert.equal(category.name, PRICE_CATEGORIES[index].name);
    assert.equal(category.url, `${SITE}${PRICE_CATALOG_PATH}#${PRICE_CATEGORIES[index].id}`);
  }
});

test('there is exactly one Offer per row of the price list', () => {
  assert.equal(offers.length, ALL_PRICE_ROWS.length);
  assert.deepEqual(
    offers.map((offer) => offer.name),
    ALL_PRICE_ROWS.map((row) => row.name),
  );
});

test('every Offer is in lei and carries the number from the data', () => {
  offers.forEach((offer, index) => {
    const row = ALL_PRICE_ROWS[index];
    assert.equal(offer['@type'], 'Offer');
    assert.deepEqual(offer.itemOffered, { '@type': 'Service', name: row.name });
    assert.deepEqual(offer.seller, { '@id': DENTIST });
    const spec = offer.priceSpecification;
    const currency = spec ? spec.priceCurrency : offer.priceCurrency;
    assert.equal(currency, 'RON', row.id);
    const amount = spec ? (spec.price ?? spec.minPrice) : offer.price;
    assert.equal(amount, row.lei, row.id);
  });
});

test('a "De la" row is a minimum price, not a fixed one', () => {
  const offer = offers.find((candidate) => candidate.name === 'Implant dentar cu inserare');
  assert.equal(offer.price, undefined);
  assert.deepEqual(offer.priceSpecification, {
    '@type': 'UnitPriceSpecification',
    minPrice: 3180,
    priceCurrency: 'RON',
    unitText: 'implant',
  });
});

test('a row priced per arch or implant names its unit', () => {
  const offer = offers.find((candidate) => candidate.name === 'Dinți ficși pe 4 implanturi');
  assert.deepEqual(offer.priceSpecification, {
    '@type': 'UnitPriceSpecification',
    price: 18550,
    priceCurrency: 'RON',
    unitText: 'arcadă',
  });
});

test('a plain row is a simple Offer with price and currency', () => {
  const offer = offers.find((candidate) => candidate.name === 'Consultație');
  assert.equal(offer.price, 210);
  assert.equal(offer.priceCurrency, 'RON');
  assert.equal(offer.priceSpecification, undefined);
});

test('no Product, no FAQPage and no euro in the structured data', () => {
  const json = JSON.stringify(catalog);
  assert.doesNotMatch(json, /"Product"|"FAQPage"|"EUR"/);
});

test('the catalog survives JSON serialization unchanged', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(catalog)), catalog);
});
