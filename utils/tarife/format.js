// Number and price formatting for the /tarife list. The clinic writes thousands
// with a dot ("1.200", "3.880"), so this does it by hand instead of Intl,
// whose grouping rules for ro-RO differ between engines.

/** 1200 -> "1.200". Only whole, non-negative numbers are prices. */
export function formatNumber(value) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw new TypeError(`Expected a whole non-negative number, got ${String(value)}`);
  }
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const formatEur = (value) => `${formatNumber(value)} €`;

/** The figure of a price: "550", or "65–110" for a range (an en dash, as the clinic writes it). */
export function formatAmount({ min, max }) {
  if (max === undefined) {
    return formatNumber(min);
  }
  if (!(max > min)) {
    throw new RangeError(`A range must go up, got ${min}–${max}`);
  }
  return `${formatNumber(min)}–${formatNumber(max)}`;
}

/**
 * A price the way the clinic writes it: "40 €", "3.500 €/arcadă",
 * "de la 550 €/implant", "65–110 €/dinte". `from` ("de la") and a range
 * (`max`) never go together.
 */
export function formatPrice({ from = false, min, max, unit }) {
  if (max !== undefined && from) {
    throw new RangeError('A price cannot be both "de la" and a range');
  }
  return `${from ? 'de la ' : ''}${formatAmount({ min, max })} €${unit ? `/${unit}` : ''}`;
}
