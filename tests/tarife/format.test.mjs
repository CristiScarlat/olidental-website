import test from 'node:test';
import assert from 'node:assert/strict';
import { formatAmount, formatNumber, formatEur, formatPrice } from '../../utils/tarife/format.js';

test('formatNumber puts a dot between thousands, like the clinic price list', () => {
  assert.equal(formatNumber(0), '0');
  assert.equal(formatNumber(85), '85');
  assert.equal(formatNumber(100), '100');
  assert.equal(formatNumber(1200), '1.200');
  assert.equal(formatNumber(3880), '3.880');
  assert.equal(formatNumber(1234567), '1.234.567');
});

test('formatNumber rejects values that are not whole non-negative numbers', () => {
  for (const bad of [-1, 1.5, NaN, Infinity, '12', null, undefined]) {
    assert.throws(() => formatNumber(bad), TypeError, `expected TypeError for ${String(bad)}`);
  }
});

test('formatEur adds the euro sign', () => {
  assert.equal(formatEur(40), '40 €');
  assert.equal(formatEur(3500), '3.500 €');
});

test('formatAmount is the figure of a price, with an en dash for a range', () => {
  assert.equal(formatAmount({ min: 550 }), '550');
  assert.equal(formatAmount({ min: 1000 }), '1.000');
  assert.equal(formatAmount({ min: 65, max: 110 }), '65–110');
  assert.throws(() => formatAmount({ min: 110, max: 65 }), RangeError);
});

test('formatPrice writes the forms of the clinic document', () => {
  assert.equal(formatPrice({ min: 40 }), '40 €');
  assert.equal(formatPrice({ min: 3500, unit: 'arcadă' }), '3.500 €/arcadă');
  assert.equal(formatPrice({ from: true, min: 550, unit: 'implant' }), 'de la 550 €/implant');
  assert.equal(formatPrice({ from: true, min: 20 }), 'de la 20 €');
  assert.equal(formatPrice({ min: 65, max: 110, unit: 'dinte' }), '65–110 €/dinte');
  assert.equal(formatPrice({ min: 550, max: 650 }), '550–650 €');
});

test('formatPrice rejects a range that is not ascending and a range with "de la"', () => {
  assert.throws(() => formatPrice({ min: 110, max: 65 }), RangeError);
  assert.throws(() => formatPrice({ min: 65, max: 65 }), RangeError);
  assert.throws(() => formatPrice({ from: true, min: 65, max: 110 }), RangeError);
});
