// Number and price formatting for the /preturi list. The clinic writes thousands
// with a dot ("1.060", "18.550"), so this does it by hand instead of Intl,
// whose grouping rules for ro-RO differ between engines.

/** 1060 -> "1.060". Only whole, non-negative numbers are prices. */
export function formatNumber(value) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw new TypeError(`Expected a whole non-negative number, got ${String(value)}`);
  }
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const formatLei = (value) => `${formatNumber(value)} lei`;
export const formatEur = (value) => `${formatNumber(value)} €`;

/**
 * A price value is either a number or the clinic's own text for a range
 * ("350–580"), which is shown exactly as written.
 */
export function formatPriceValue(value, currency) {
  const amount = typeof value === 'string' ? value : formatNumber(value);
  return `${amount} ${currency}`;
}
