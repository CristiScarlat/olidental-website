'use client';
import { useEffect, useRef } from 'react';

const WIDGET_ID = "JFWebsiteWidget-019d7bc2c0b3747ebcdd33f78f7d1c561170";
const SCRIPT_ID = "jotform-widget-script";
const SCRIPT_SRC = "https://www.jotform.com/website-widgets/embed/019d7bc2c0b3747ebcdd33f78f7d1c561170";

// Start loading a bit before the section scrolls into view, so the reviews
// are usually ready by the time a visitor reaches them.
const PRELOAD_MARGIN = "300px";

// Space reserved while the widget loads, so the content below doesn't jump
// when it appears. Measured on the rendered widget (cards + pagination dots):
// 454px at 1440px wide, 446px at 390px wide. Re-measure if the widget changes.
const WIDGET_MIN_HEIGHT = 460;

export default function GoogleReviews() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = document.getElementById(WIDGET_ID);
    if (!section || !container) return undefined;

    const loadWidget = () => {
      if (container.children.length > 0 || document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.id = SCRIPT_ID;
      document.body.appendChild(script);
    };

    let observer = null;
    if (typeof IntersectionObserver === 'undefined') {
      loadWidget();
    } else {
      observer = new IntersectionObserver((entries, obs) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          obs.disconnect();
          loadWidget();
        }
      }, { rootMargin: PRELOAD_MARGIN });
      observer.observe(section);
    }

    return () => {
      if (observer) observer.disconnect();
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) existingScript.remove();
      container.replaceChildren();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-10 bg-gray" style={{ borderBottom: '3px solid #00000014' }}>
      <h2 className="text-center pt-4 mb-2">Ce spun pacienții noștri</h2>
      <div id={WIDGET_ID} style={{ minHeight: WIDGET_MIN_HEIGHT }}></div>
    </section>
  );
}
