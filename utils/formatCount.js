// Romanian count phrases: "1 caz", "6 cazuri", "20 de cazuri", "115 cazuri".
// Numbers whose last two digits are 00 or 20–99 (from 20 up) take "de".
export function formatCount(count, singular, plural) {
  if (count === 1) {
    return `1 ${singular}`;
  }
  const lastTwoDigits = count % 100;
  const needsDe = count >= 20 && (lastTwoDigits === 0 || lastTwoDigits >= 20);
  return `${count} ${needsDe ? 'de ' : ''}${plural}`;
}
