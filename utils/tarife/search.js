// Search for the /preturi list. Visitors type with or without Romanian
// diacritics (and ş/ţ with a cedilla are common on old keyboards), so both the
// service names and the query are reduced to plain lowercase letters.

/** "Ortodonție" -> "ortodontie". Safe for null / undefined. */
export function normalizeText(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * True when every word of the query appears in the (already normalized)
 * search key, in any order. An empty query matches everything.
 */
export function matchesQuery(searchKey, query) {
  const words = normalizeText(query).split(' ').filter(Boolean);
  return words.every((word) => searchKey.includes(word));
}

/**
 * Which rows match the query, and how many per category. `rows` need `id`,
 * `categoryId` and a normalized `searchKey`. While the query is empty
 * (`active` false) every row is visible.
 */
export function filterRows(rows, query) {
  const active = normalizeText(query) !== '';
  const visibleIds = new Set();
  const countsByCategory = {};
  for (const row of rows) {
    countsByCategory[row.categoryId] ??= 0;
    if (!active || matchesQuery(row.searchKey, query)) {
      visibleIds.add(row.id);
      countsByCategory[row.categoryId] += 1;
    }
  }
  return { active, total: visibleIds.size, visibleIds, countsByCategory };
}

/**
 * Which blocks of a category still have something to show for the current
 * search: a table or featured block with at least one visible row, and a note
 * only while the row block just above it is shown.
 */
export function visibleBlockFlags(blocks, visibleIds) {
  let previousVisible = true;
  return blocks.map((block) => {
    const rows = block.rows ?? block.items;
    if (!rows) {
      return previousVisible;
    }
    previousVisible = rows.some((row) => visibleIds.has(row.id));
    return previousVisible;
  });
}
