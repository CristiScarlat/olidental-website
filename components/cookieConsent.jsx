import React, { useEffect, useRef } from "react";
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './styles/styles.module.css';
import { CONSENT_ACCEPTED, CONSENT_REJECTED } from '../utils/useCookieConsent';

// Shown only while the visitor has not chosen yet (the parent decides that).
// Accept and Reject are deliberately identical in look and size: refusing must
// be as easy as accepting. Both use the light outline so their labels keep
// enough contrast on the dark background (WCAG AA needs 4.5:1).
const CookieConsentBanner = ({ onChoose, autoFocus = false }) => {
  const regionRef = useRef(null);

  // Reopened from the footer, the banner mounts last in the DOM: move focus to
  // it so screen readers announce it and keyboard users don't have to tab
  // through the rest of the page. First visits never steal focus.
  useEffect(() => {
    if (autoFocus) regionRef.current?.focus();
  }, [autoFocus]);

  return (
    <div
      ref={regionRef}
      tabIndex={-1}
      role="region"
      aria-label="Consimțământ cookie-uri"
      className={styles.cookieConsentBanner}
      style={{
        backgroundColor: "#082d3f",
        width: "100%",
        position: "fixed",
        color: "white",
        padding: '0.5rem 2rem',
        outline: 'none'
      }}
    >
      <p>Folosim cookie-uri pentru funcționarea site-ului și, doar cu acordul tău, cookie-uri de analiză (Google Analytics) pentru a-l îmbunătăți.</p>
      <p>Poți accepta sau refuza analiza, iar site-ul funcționează la fel. Detalii în <Link href="/politica-cookies" style={{ color: 'inherit', textDecoration: 'underline' }}>Politica de cookies</Link>.</p>
      <div className="d-flex gap-3 mt-3">
        <Button onClick={() => onChoose(CONSENT_ACCEPTED)} variant="outline-light">Acceptă</Button>
        <Button onClick={() => onChoose(CONSENT_REJECTED)} variant="outline-light">Respinge</Button>
        {/* A plain Link styled as a button: react-bootstrap's `Button as={Link}`
            would force role="button" and swallow the Space key on a real link. */}
        <Link
          href="/politica-cookies"
          className="btn btn-link text-white"
          style={{ '--bs-btn-focus-shadow-rgb': '248, 249, 250' }}
        >
          Află mai mult
        </Link>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
