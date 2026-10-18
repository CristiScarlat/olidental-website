import { useEffect, useState } from 'react';

// Below this width the procedure pages show scroll arrows under the case
// previews.
const DEFAULT_NARROW_WIDTH = 450;

/**
 * True while the window is narrower than `maxWidth` px. Starts as false and is
 * measured after mount (and again on every resize), so the server HTML and the
 * first client render are the same: reading `window` during render made them
 * differ on phones (React errors #418/#423).
 */
export const useIsNarrowWidth = (maxWidth = DEFAULT_NARROW_WIDTH) => {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const updateWidth = () => setIsNarrow(window.innerWidth < maxWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [maxWidth]);

  return isNarrow;
};
