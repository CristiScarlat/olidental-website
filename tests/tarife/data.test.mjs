import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ALL_PRICE_ROWS, PRICE_GROUPS, findGroup, findRowByName } from '../../utils/tarife/index.js';
import { CLOSING, DOCUMENT_SUBTITLE, DOCUMENT_TITLE } from '../../utils/tarife/grupuri.js';

// The clinic's own document ("tarife olidental med 2.docx", received 2026-11-13), read into JSON.
const document = JSON.parse(readFileSync(new URL('./fixtures/clinic-document.json', import.meta.url), 'utf8'));

const EXPECTED_COUNTS = {
  implantologie: 3,
  consultatii: 4,
  'igienizare-estetica': 3,
  'carii-endodontie': 3,
  'coroane-fatete': 6,
  'chirurgie-parodontologie': 6,
  'proteze-gutiere': 4,
  ortodontie: 5,
  'stomatologie-copii': 5,
};

test('the 9 groups follow the order of the clinic document', () => {
  assert.deepEqual(
    PRICE_GROUPS.map((group) => group.id),
    Object.keys(EXPECTED_COUNTS),
  );
  assert.deepEqual(
    PRICE_GROUPS.map((group) => group.name),
    document.groups.map((group) => group.name),
  );
});

test('every group has the number of price rows the document has', () => {
  for (const group of PRICE_GROUPS) {
    assert.equal(group.rows.length, EXPECTED_COUNTS[group.id], group.id);
  }
  assert.equal(ALL_PRICE_ROWS.length, 39);
});

test('names, prices, intros and notes are the words of the document, one by one', () => {
  PRICE_GROUPS.forEach((group, index) => {
    const expected = document.groups[index];
    assert.deepEqual(
      group.rows.map((row) => [row.name, row.priceText]),
      expected.rows,
      group.id,
    );
    assert.equal(group.intro, expected.intro ?? null, `${group.id} intro`);
    assert.equal(group.note, expected.note ?? null, `${group.id} note`);
  });
});

test('the title, subtitle and closing text are the words of the document', () => {
  assert.equal(DOCUMENT_TITLE, document.title);
  assert.equal(DOCUMENT_SUBTITLE, document.subtitle);
  assert.deepEqual(CLOSING, document.closing);
});

test('every price is a whole number of euro, and a range goes up', () => {
  for (const row of ALL_PRICE_ROWS) {
    assert.ok(row.name.length > 0, row.id);
    assert.ok(Number.isInteger(row.min) && row.min > 0, `${row.id} min`);
    if (row.max !== undefined) {
      assert.ok(Number.isInteger(row.max) && row.max > row.min, `${row.id} max`);
      assert.ok(!row.from, `${row.id} is both a range and "de la"`);
    }
  }
});

test('row ids are unique and built from the group id', () => {
  const ids = ALL_PRICE_ROWS.map((row) => row.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const group of PRICE_GROUPS) {
    assert.match(group.id, /^[a-z-]+$/);
  }
  for (const row of ALL_PRICE_ROWS) {
    assert.match(row.id, /^[a-z-]+-\d+$/);
    assert.ok(row.id.startsWith(`${row.groupId}-`), row.id);
  }
});

test('every group has a chip label and at least one internal link', () => {
  for (const group of PRICE_GROUPS) {
    assert.ok(group.shortName.length > 0, group.id);
    assert.ok(group.links.length >= 1, `${group.id} links`);
    for (const link of group.links) {
      assert.ok(link.href.startsWith('/') && link.label, `${group.id} link`);
    }
  }
});

test('the data cannot be changed after it is built', () => {
  assert.ok(Object.isFrozen(PRICE_GROUPS));
  assert.ok(Object.isFrozen(PRICE_GROUPS[0]));
  assert.ok(Object.isFrozen(PRICE_GROUPS[0].rows));
  assert.ok(Object.isFrozen(PRICE_GROUPS[0].links));
  assert.ok(Object.isFrozen(ALL_PRICE_ROWS[0]));
});

test('rows with a special format keep the clinic wording and numbers', () => {
  const implant = findRowByName('Implant dentar cu inserare');
  assert.equal(implant.priceText, 'de la 550 €/implant');
  assert.equal(implant.from, true);
  assert.equal(implant.min, 550);
  assert.equal(implant.unit, 'implant');

  assert.equal(findRowByName('Dinți ficși pe 4 implanturi').priceText, '3.500 €/arcadă');
  assert.equal(findRowByName('Dinți ficși pe 6 implanturi').priceText, '4.800 €/arcadă');
  assert.equal(findRowByName('Obturație estetică').priceText, '65–110 €/dinte');
  assert.equal(findRowByName('Proteză totală').priceText, '550–650 €');
  assert.equal(findRowByName('Consultație').priceText, '40 €');
});

test('findGroup and findRowByName fail loudly for an unknown name', () => {
  assert.throws(() => findRowByName('Serviciu inexistent'), /Serviciu inexistent/);
  assert.throws(() => findGroup('grup-inexistent'), /grup-inexistent/);
  assert.equal(findGroup('ortodontie').name, 'Ortodonție');
});
