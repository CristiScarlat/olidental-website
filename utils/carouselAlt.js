// Shared helper for generating descriptive, non-identical alt text for a
// cycled set of carousel slides: `words[index % words.length]` plus a
// "(fotografie N)" suffix so every slide gets distinct, meaningful text
// instead of a single repeated placeholder.
export const buildCarouselAltTextGetter = (phrases) => (index) =>
  `${phrases[index % phrases.length]} (fotografie ${index + 1})`;
