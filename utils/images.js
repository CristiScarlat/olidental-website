// Every displayed `thumbnail_*.jpg` has a smaller .webp twin next to it
// (scripts/optimize-thumbnail-images.js). The data in utils/uiConstants.js keeps
// the original JPEG names; pages map them here when building <img> sources.
export function toWebp(src) {
  return typeof src === 'string' ? src.replace(/\.jpe?g$/i, '.webp') : src;
}
