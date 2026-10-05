import cookie from 'js-cookie';

export const GA_MEASUREMENT_ID = 'G-7Z3QYDZ2Z4';

// GA4 keeps its state in `_ga` and `_ga_<measurement id without the "G-">`.
const gaCookieNames = (measurementId) => ['_ga', `_ga_${measurementId.replace(/^G-/, '')}`];

// GA writes these cookies on the registrable domain (".olidental.ro"), so a
// plain remove() would miss them. Try the host and every parent domain, minus
// the bare TLD (browsers refuse cookies on it anyway).
export const cookieDomainCandidates = (hostname) => {
  const labels = hostname.split('.');
  return labels.slice(0, -1).map((_, index) => labels.slice(index).join('.'));
};

const clearAnalyticsCookies = (measurementId) => {
  const attributeSets = [
    { path: '/' },
    ...cookieDomainCandidates(window.location.hostname).map((domain) => ({ path: '/', domain })),
  ];
  gaCookieNames(measurementId).forEach((name) => {
    attributeSets.forEach((attributes) => cookie.remove(name, attributes));
  });
};

// Google's documented opt-out switch: while it is true gtag.js sends nothing,
// even if the script already loaded earlier in this page view. Without consent
// we also drop any GA cookies left over from before the banner gated analytics.
export const applyAnalyticsConsent = (allowed, measurementId = GA_MEASUREMENT_ID) => {
  window[`ga-disable-${measurementId}`] = !allowed;
  if (!allowed) clearAnalyticsCookies(measurementId);
};
