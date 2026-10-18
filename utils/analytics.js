import cookie from 'js-cookie';
import { CONSENT_COOKIE, CONSENT_ACCEPTED } from './useCookieConsent';

export const GA_MEASUREMENT_ID = 'G-Q7D9QE4129';

// GA4 property used until 2026-10-09. Nothing writes its cookie any more, so
// it is removed from visitors who still carry it.
const RETIRED_MEASUREMENT_IDS = ['G-7Z3QYDZ2Z4'];

// Google Consent Mode v2. The one "Acceptă" on the banner covers analytics
// (Google Analytics) and marketing (Google Ads), so all four signals move
// together.
const CONSENT_TYPES = ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'];

// Google Ads conversion cookies, removed when consent is refused or withdrawn.
const ADS_COOKIE_NAMES = ['_gcl_au', '_gcl_aw', '_gcl_dc'];

// GA4 keeps its state in `_ga` and `_ga_<measurement id without the "G-">`.
const propertyCookieName = (measurementId) => `_ga_${measurementId.replace(/^G-/, '')}`;
const gaCookieNames = (measurementId) => ['_ga', propertyCookieName(measurementId)];

const consentState = (allowed) =>
  Object.fromEntries(CONSENT_TYPES.map((type) => [type, allowed ? 'granted' : 'denied']));

/**
 * Inline script for <head> (pages/_document.js), run before gtag.js loads.
 * "Advanced" consent mode: the tag always loads, but until the visitor
 * accepts it sets no cookies and sends Google only cookieless pings. A
 * returning visitor who already accepted starts as "granted", so the first
 * page view of the visit is measured normally.
 */
export const buildConsentDefaultScript = () => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var accepted = /(?:^|; )${CONSENT_COOKIE}=${CONSENT_ACCEPTED}(?:;|$)/.test(document.cookie);
var state = accepted ? 'granted' : 'denied';
gtag('consent', 'default', {${CONSENT_TYPES.map((type) => `${type}: state`).join(', ')}, wait_for_update: 500});
gtag('set', 'ads_data_redaction', true);
`;

// GA writes these cookies on the registrable domain (".olidental.ro"), so a
// plain remove() would miss them. Try the host and every parent domain, minus
// the bare TLD (browsers refuse cookies on it anyway).
export const cookieDomainCandidates = (hostname) => {
  const labels = hostname.split('.');
  return labels.slice(0, -1).map((_, index) => labels.slice(index).join('.'));
};

const clearCookies = (names) => {
  const attributeSets = [
    { path: '/' },
    ...cookieDomainCandidates(window.location.hostname).map((domain) => ({ path: '/', domain })),
  ];
  names.forEach((name) => {
    attributeSets.forEach((attributes) => cookie.remove(name, attributes));
  });
};

/**
 * Passes the visitor's banner choice to Google. Refusing or withdrawing
 * switches all four signals back to "denied" and deletes the GA and Ads
 * cookies already set.
 */
export const applyConsent = (allowed, measurementId = GA_MEASUREMENT_ID) => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consentState(allowed));
  }
  clearCookies(RETIRED_MEASUREMENT_IDS.map(propertyCookieName));
  if (!allowed) clearCookies([...gaCookieNames(measurementId), ...ADS_COOKIE_NAMES]);
};

/** Sends a GA4 event (imported into Google Ads as a conversion). No personal data in params. */
export const trackEvent = (name, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
};
