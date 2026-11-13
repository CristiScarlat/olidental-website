// The clinic price list as data: one source for the /tarife page, its
// JSON-LD and the FAQ answers. The numbers and wording live in ./grupuri.js
// (taken from the clinic's own document); this file only adds ids and the
// price text, and freezes everything.
import { RAW_GROUPS } from './grupuri.js';
import { formatPrice } from './format.js';

const freezeAll = (list) => Object.freeze(list.map((item) => Object.freeze({ ...item })));

function buildGroup(group) {
  const rows = group.rows.map((row, index) =>
    Object.freeze({ ...row, id: `${group.id}-${index + 1}`, groupId: group.id, priceText: formatPrice(row) }),
  );
  return Object.freeze({
    id: group.id,
    shortName: group.shortName,
    name: group.name,
    intro: group.intro ?? null,
    note: group.note ?? null,
    rows: Object.freeze(rows),
    links: freezeAll(group.links),
  });
}

// Same order as the clinic document.
export const PRICE_GROUPS = Object.freeze(RAW_GROUPS.map(buildGroup));

export const ALL_PRICE_ROWS = Object.freeze(PRICE_GROUPS.flatMap((group) => group.rows));

/** The group with this id. Throws, so a renamed group cannot silently break the FAQ. */
export function findGroup(id) {
  const group = PRICE_GROUPS.find((candidate) => candidate.id === id);
  if (!group) {
    throw new Error(`No price group with id "${id}"`);
  }
  return group;
}

/** First row with exactly this name. Throws, so a renamed row cannot silently break the FAQ. */
export function findRowByName(name) {
  const row = ALL_PRICE_ROWS.find((candidate) => candidate.name === name);
  if (!row) {
    throw new Error(`No price row named "${name}"`);
  }
  return row;
}
