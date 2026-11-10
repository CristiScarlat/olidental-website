import { useEffect } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isPlainClick = (event) =>
  event.button === 0 && !event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

function hashToId(hash) {
  try {
    return decodeURIComponent((hash || '').replace(/^#/, ''));
  } catch {
    return '';
  }
}

/**
 * Opens the <details> with this id and scrolls it into view. Only the DOM
 * element's own `open` flag changes (React keeps no state for it). Returns
 * false when the id isn't on the page, so the browser handles the link.
 */
function revealSection(id, { smooth = false, focus = false } = {}) {
  const target = id ? document.getElementById(id) : null;
  if (!target || target.hidden) {
    return false;
  }
  if (target instanceof HTMLDetailsElement) {
    target.open = true;
  }
  target.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' });
  if (focus) {
    target.querySelector('summary')?.focus({ preventScroll: true });
  }
  return true;
}

/**
 * A link to #category (chips, cards, ads) opens that category's accordion.
 * Same-hash clicks fire no hashchange, hence the click listener as well.
 *
 * When the target is hidden by the search filter, `onTargetHidden` (clearing
 * the search) runs first and the section is revealed once it is back.
 */
export function useRevealOnHash(containerRef, onTargetHidden) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    const isHiddenBySearch = (id) => {
      const target = id ? document.getElementById(id) : null;
      return Boolean(target && target.hidden);
    };
    const revealAfterSearchCleared = (id, options) => {
      onTargetHidden?.();
      window.requestAnimationFrame(() => revealSection(id, options));
    };

    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!link || !isPlainClick(event)) {
        return;
      }
      const href = link.getAttribute('href');
      const id = hashToId(href);
      const options = { smooth: true, focus: true };
      if (isHiddenBySearch(id) && onTargetHidden) {
        revealAfterSearchCleared(id, options);
      } else if (!revealSection(id, options)) {
        return;
      }
      event.preventDefault();
      // Keeps Next.js's history state; changes only the hash, with no new entry.
      window.history.replaceState(window.history.state, '', href);
    };
    const onHashChange = () => {
      const id = hashToId(window.location.hash);
      if (isHiddenBySearch(id) && onTargetHidden) {
        revealAfterSearchCleared(id, { smooth: true });
      } else {
        revealSection(id, { smooth: true });
      }
    };

    container.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHashChange);
    revealSection(hashToId(window.location.hash));
    return () => {
      container.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [containerRef, onTargetHidden]);
}

/** Browsers print only open <details>; open them all for the print, then restore. */
export function useOpenAllOnPrint(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    let reopened = [];
    const onBeforePrint = () => {
      reopened = [...container.querySelectorAll('details:not([open])')];
      reopened.forEach((details) => {
        details.open = true;
      });
    };
    const onAfterPrint = () => {
      reopened.forEach((details) => {
        details.open = false;
      });
      reopened = [];
    };
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, [containerRef]);
}

/** Opens or closes every accordion inside the container. */
export function setAllDetails(container, open) {
  container?.querySelectorAll('details').forEach((details) => {
    details.open = open;
  });
}
