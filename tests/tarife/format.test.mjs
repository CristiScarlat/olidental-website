import test from 'node:test';
import assert from 'node:assert/strict';
import { formatNumber, formatLei, formatEur, formatPriceValue } from '../../utils/tarife/format.js';

test('formatNumber puts a dot between thousands, like the clinic price list', () => {
  assert.equal(formatNumber(0), '0');
  assert.equal(formatNumber(85), '85');
  assert.equal(formatNumber(100), '100');
  assert.equal(formatNumber(1060), '1.060');
  assert.equal(formatNumber(18550), '18.550');
  assert.equal(formatNumber(1234567), '1.234.567');
});

test('formatNumber rejects values that are not whole non-negative numbers', () => {
  for (const bad of [-1, 1.5, NaN, Infinity, '12', null, undefined]) {
    assert.throws(() => formatNumber(bad), TypeError, `expected TypeError for ${String(bad)}`);
  }
});

test('formatLei and formatEur add the currency', () => {
  assert.equal(formatLei(1060), '1.060 lei');
  assert.equal(formatLei(0), '0 lei');
  assert.equal(formatEur(65), '65 €');
  assert.equal(formatEur(3500), '3.500 €');
});

test('formatPriceValue passes text ranges through unchanged', () => {
  assert.equal(formatPriceValue('350–580', 'lei'), '350–580 lei');
  assert.equal(formatPriceValue('65–110', '€'), '65–110 €');
  assert.equal(formatPriceValue(350, 'lei'), '350 lei');
  assert.equal(formatPriceValue(3500, '€'), '3.500 €');
});
