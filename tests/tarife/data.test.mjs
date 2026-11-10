import test from 'node:test';
import assert from 'node:assert/strict';
import { PRICE_CATEGORIES, ALL_PRICE_ROWS, countRows, findRowByName } from '../../utils/tarife/index.js';

// Row counts of "tarife olidental.docx" (clinic price list, received 2026-11-10).
const EXPECTED_COUNTS = {
  consultatii: 11,
  'igienizare-albire': 7,
  'carii-restaurari': 7,
  endodontie: 19,
  parodontologie: 9,
  'chirurgie-orala': 13,
  implantologie: 7,
  'protetica-dinti-naturali': 19,
  'protetica-implanturi': 15,
  'arcade-fixe-implanturi': 4,
  'proteze-gutiere': 15,
  ortodontie: 24,
  'stomatologie-copii': 30,
};

test('the 13 categories follow the order of the clinic document', () => {
  assert.deepEqual(
    PRICE_CATEGORIES.map((category) => category.id),
    Object.keys(EXPECTED_COUNTS),
  );
});

test('every category has the number of price rows the document has', () => {
  for (const category of PRICE_CATEGORIES) {
    assert.equal(countRows(category), EXPECTED_COUNTS[category.id], category.id);
  }
  assert.equal(ALL_PRICE_ROWS.length, 180);
});

test('every row has a name and whole-number prices in lei and euro', () => {
  for (const row of ALL_PRICE_ROWS) {
    assert.ok(row.name.length > 0, row.id);
    assert.ok(Number.isInteger(row.lei) && row.lei >= 0, `${row.id} lei`);
    assert.ok(Number.isInteger(row.eur) && row.eur >= 0, `${row.id} eur`);
  }
});

test('row ids are unique and built from the category id', () => {
  const ids = ALL_PRICE_ROWS.map((row) => row.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const category of PRICE_CATEGORIES) {
    assert.match(category.id, /^[a-z-]+$/);
  }
  for (const row of ALL_PRICE_ROWS) {
    assert.match(row.id, /^[a-z-]+-\d+$/);
  }
});

test('every category has a title, an intro and at least one internal link', () => {
  for (const category of PRICE_CATEGORIES) {
    assert.ok(category.name && category.shortName, category.id);
    assert.ok(category.intro && category.intro.length > 20, `${category.id} intro`);
    assert.ok(category.links.length >= 1, `${category.id} links`);
    for (const link of category.links) {
      assert.ok(link.href.startsWith('/') && link.label, `${category.id} link`);
    }
  }
});

test('the data cannot be changed after it is built', () => {
  assert.ok(Object.isFrozen(PRICE_CATEGORIES));
  assert.ok(Object.isFrozen(PRICE_CATEGORIES[0]));
  assert.ok(Object.isFrozen(PRICE_CATEGORIES[0].blocks));
  assert.ok(Object.isFrozen(ALL_PRICE_ROWS[0]));
});

test('rows with a special format keep the clinic wording and numbers', () => {
  const implant = findRowByName('Implant dentar cu inserare');
  assert.equal(implant.prefix, 'De la');
  assert.equal(implant.lei, 3180);
  assert.equal(implant.eur, 600);
  assert.equal(implant.unit, 'implant');

  const four = findRowByName('Dinți ficși pe 4 implanturi');
  assert.equal(four.lei, 18550);
  assert.equal(four.eur, 3500);
  assert.equal(four.unit, 'arcadă');
  assert.match(four.includes, /compozit Blender/);
  assert.match(four.includes, /4 implanturi/);

  const six = findRowByName('Dinți ficși pe 6 implanturi');
  assert.equal(six.lei, 25440);
  assert.equal(six.eur, 4800);

  const consult = findRowByName('Consultație');
  assert.equal(consult.lei, 210);
  assert.equal(consult.eur, 40);

  assert.equal(findRowByName('Sinus lift extern, manoperă și material conform grilei').lei, 5300);
  assert.equal(findRowByName('Elaborarea și discutarea planului de tratament').lei, 0);
});

test('the filling card shows the range the clinic gave', () => {
  const fillings = PRICE_CATEGORIES.find((category) => category.id === 'carii-restaurari');
  assert.deepEqual(fillings.cardPrices, [{ name: 'Obturație estetică', lei: '350–580', eur: '65–110' }]);
});

test('findRowByName fails loudly for an unknown name', () => {
  assert.throws(() => findRowByName('Serviciu inexistent'), /Serviciu inexistent/);
});
