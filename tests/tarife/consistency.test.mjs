import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_PRICE_ROWS } from '../../utils/tarife/index.js';

// The clinic's lei and euro columns follow one rate, about 5.3 lei per euro
// (rounded to 5 lei). Prices are kept exactly as the clinic wrote them, so this
// test does not fix anything: it lists the rows whose two columns disagree, to be
// confirmed with the clinic, and fails if a NEW disagreement appears.
const RATE = 5.3;
const KNOWN_MISMATCHES = new Map([
  ['Aparat fix cu brackeți din safir, pe arcadă', '5.530 lei for 1.000 € (at 5.3 it would be 5.300 lei)'],
  ['Proteză totală cu dinți din compozit', '3.345 lei for 650 € (at 5.3 it would be 3.445 lei)'],
]);

const disagrees = (row) => Math.abs(row.lei - row.eur * RATE) > Math.max(8, row.lei * 0.02);

test('lei and euro agree at one rate, except the rows listed for the clinic to confirm', () => {
  const found = ALL_PRICE_ROWS.filter((row) => row.lei > 0 && row.eur > 0 && disagrees(row)).map((row) => row.name);
  assert.deepEqual(found.sort(), [...KNOWN_MISMATCHES.keys()].sort());
});

test('the 0 lei row is free in both currencies', () => {
  const free = ALL_PRICE_ROWS.filter((row) => row.lei === 0 || row.eur === 0);
  assert.ok(free.every((row) => row.lei === 0 && row.eur === 0));
});
