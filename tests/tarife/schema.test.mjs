import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPriceCatalogSchema, PRICE_CATALOG_PATH } from '../../utils/priceSchema.js';
import { PRICE_GROUPS, ALL_PRICE_ROWS } from '../../utils/tarife/index.js';

const SITE = 'https://olidental.ro';
const DENTIST = `${SITE}/#dentist`;
const catalog = buildPriceCatalogSchema({ siteUrl: SITE, dentistId: DENTIST });
const offers = catalog.itemListElement.flatMap((group) => group.itemListElement);
const offerOf = (name) => offers.find((candidate) => candidate.name === name);

test('the catalog is one OfferCatalog with a sub-catalog per group', () => {
  assert.equal(catalog['@context'], 'https://schema.org');
  assert.equal(catalog['@type'], 'OfferCatalog');
  assert.equal(catalog['@id'], `${SITE}${PRICE_CATALOG_PATH}#catalog`);
  assert.equal(catalog.itemListElement.length, PRICE_GROUPS.length);
  for (const [index, group] of catalog.itemListElement.entries()) {
    assert.equal(group['@type'], 'OfferCatalog');
    assert.equal(group.name, PRICE_GROUPS[index].name);
    assert.equal(group.url, `${SITE}${PRICE_CATALOG_PATH}#${PRICE_GROUPS[index].id}`);
  }
});

test('there is exactly one Offer per row of the price list', () => {
  assert.equal(offers.length, ALL_PRICE_ROWS.length);
  assert.deepEqual(
    offers.map((offer) => offer.name),
    ALL_PRICE_ROWS.map((row) => row.name),
  );
});

test('every Offer is in euro, sold by the dentist, and carries the number from the data', () => {
  offers.forEach((offer, index) => {
    const row = ALL_PRICE_ROWS[index];
    assert.equal(offer['@type'], 'Offer');
    assert.deepEqual(offer.itemOffered, { '@type': 'Service', name: row.name });
    assert.deepEqual(offer.seller, { '@id': DENTIST });
    const spec = offer.priceSpecification;
    assert.equal(spec ? spec.priceCurrency : offer.priceCurrency, 'EUR', row.id);
    const amount = spec ? (spec.price ?? spec.minPrice) : offer.price;
    assert.equal(amount, row.min, row.id);
  });
});

test('a plain row is a simple Offer with price and currency', () => {
  const offer = offerOf('Consultație');
  assert.equal(offer.price, 40);
  assert.equal(offer.priceCurrency, 'EUR');
  assert.equal(offer.priceSpecification, undefined);
});

test('a "de la" row is a minimum price with its unit, not a fixed one', () => {
  const offer = offerOf('Implant dentar cu inserare');
  assert.equal(offer.price, undefined);
  assert.deepEqual(offer.priceSpecification, {
    '@type': 'UnitPriceSpecification',
    minPrice: 550,
    priceCurrency: 'EUR',
    unitText: 'implant',
  });
  assert.deepEqual(offerOf('Radiografie panoramică').priceSpecification, {
    '@type': 'PriceSpecification',
    minPrice: 20,
    priceCurrency: 'EUR',
  });
});

test('a row priced per arch names its unit', () => {
  assert.deepEqual(offerOf('Dinți ficși pe 4 implanturi').priceSpecification, {
    '@type': 'UnitPriceSpecification',
    price: 3500,
    priceCurrency: 'EUR',
    unitText: 'arcadă',
  });
});

test('a range has a lowest and a highest price', () => {
  assert.deepEqual(offerOf('Obturație estetică').priceSpecification, {
    '@type': 'UnitPriceSpecification',
    minPrice: 65,
    maxPrice: 110,
    priceCurrency: 'EUR',
    unitText: 'dinte',
  });
  assert.deepEqual(offerOf('Proteză totală').priceSpecification, {
    '@type': 'PriceSpecification',
    minPrice: 550,
    maxPrice: 650,
    priceCurrency: 'EUR',
  });
});

test('no Product, no FAQPage and no lei in the structured data', () => {
  const json = JSON.stringify(catalog);
  assert.doesNotMatch(json, /"Product"|"FAQPage"|"RON"/);
});

test('the catalog survives JSON serialization unchanged', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(catalog)), catalog);
});
