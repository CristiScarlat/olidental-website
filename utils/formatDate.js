// Same output as formatDateRo in utils/blogPosts.js, kept separate so pages
// that only need a date don't bundle the whole blog registry.
const MONTHS_RO = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
];

/** "2026-10-05" -> "5 octombrie 2026" (fixed month names, so server and
 * browser render the same text and hydration never mismatches). */
export function formatDateRo(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} ${MONTHS_RO[month - 1]} ${year}`;
}
