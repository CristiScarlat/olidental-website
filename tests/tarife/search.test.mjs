import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeText, matchesQuery } from '../../utils/tarife/search.js';

test('normalizeText drops diacritics, including the cedilla variants', () => {
  assert.equal(normalizeText('Ortodonție'), 'ortodontie');
  assert.equal(normalizeText('Șlefuire și țesut'), 'slefuire si tesut');
  assert.equal(normalizeText('ŞŢ şţ'), 'st st');
  assert.equal(normalizeText('Fațetă înșurubată, în față'), 'fateta insurubata, in fata');
});

test('normalizeText lowercases, collapses spaces and tolerates empty input', () => {
  assert.equal(normalizeText('  CBCT   Total '), 'cbct total');
  assert.equal(normalizeText(''), '');
  assert.equal(normalizeText(null), '');
  assert.equal(normalizeText(undefined), '');
});

test('matchesQuery needs every word of the query, in any order', () => {
  const key = normalizeText('Tratament de canal cu reconstrucție, molar');
  assert.equal(matchesQuery(key, 'canal'), true);
  assert.equal(matchesQuery(key, 'molar canal'), true);
  assert.equal(matchesQuery(key, 'reconstructie'), true);
  assert.equal(matchesQuery(key, 'canal incisiv'), false);
});

test('matchesQuery ignores diacritics typed by the visitor and shows everything for an empty query', () => {
  const key = normalizeText('Coroană din zirconiu monolitic');
  assert.equal(matchesQuery(key, 'COROANĂ'), true);
  assert.equal(matchesQuery(key, 'coroana zirconiu'), true);
  assert.equal(matchesQuery(key, ''), true);
  assert.equal(matchesQuery(key, '   '), true);
});

test('filterRows keeps everything visible while the query is empty', async () => {
  const { filterRows } = await import('../../utils/tarife/search.js');
  const rows = [
    { id: 'a-1', categoryId: 'a', searchKey: 'tratament de canal molar' },
    { id: 'a-2', categoryId: 'a', searchKey: 'extractie' },
    { id: 'b-1', categoryId: 'b', searchKey: 'canal retratament' },
  ];
  const all = filterRows(rows, '   ');
  assert.equal(all.active, false);
  assert.equal(all.total, 3);
  assert.deepEqual([...all.visibleIds].sort(), ['a-1', 'a-2', 'b-1']);
});

test('filterRows counts the matching rows per category', async () => {
  const { filterRows } = await import('../../utils/tarife/search.js');
  const rows = [
    { id: 'a-1', categoryId: 'a', searchKey: 'tratament de canal molar' },
    { id: 'a-2', categoryId: 'a', searchKey: 'extractie' },
    { id: 'b-1', categoryId: 'b', searchKey: 'canal retratament' },
  ];
  const result = filterRows(rows, 'CANAL');
  assert.equal(result.active, true);
  assert.equal(result.total, 2);
  assert.deepEqual([...result.visibleIds].sort(), ['a-1', 'b-1']);
  assert.deepEqual(result.countsByCategory, { a: 1, b: 1 });

  const none = filterRows(rows, 'zzz');
  assert.equal(none.total, 0);
  assert.deepEqual(none.countsByCategory, { a: 0, b: 0 });
});

test('visibleBlockFlags hides a block with no matching row, and a note next to a hidden block', async () => {
  const { visibleBlockFlags } = await import('../../utils/tarife/search.js');
  const blocks = [
    { type: 'featured', items: [{ id: 'x-1' }] },
    { type: 'table', rows: [{ id: 'x-2' }, { id: 'x-3' }] },
    { type: 'note', text: 'about the table above' },
    { type: 'table', rows: [{ id: 'x-4' }] },
  ];
  assert.deepEqual(visibleBlockFlags(blocks, new Set(['x-1', 'x-2', 'x-3', 'x-4'])), [true, true, true, true]);
  assert.deepEqual(visibleBlockFlags(blocks, new Set(['x-3'])), [false, true, true, false]);
  assert.deepEqual(visibleBlockFlags(blocks, new Set(['x-4'])), [false, false, false, true]);
  assert.deepEqual(visibleBlockFlags(blocks, new Set()), [false, false, false, false]);
});

test('visibleBlockFlags keeps a note that comes before any row block', async () => {
  const { visibleBlockFlags } = await import('../../utils/tarife/search.js');
  const blocks = [{ type: 'note', text: 'intro note' }, { type: 'table', rows: [{ id: 'y-1' }] }];
  assert.deepEqual(visibleBlockFlags(blocks, new Set(['y-1'])), [true, true]);
});
