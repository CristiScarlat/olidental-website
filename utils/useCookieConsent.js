import { useCallback, useEffect, useState } from 'react';
import cookie from 'js-cookie';

export const CONSENT_COOKIE = 'cookieConsent';
export const CONSENT_ACCEPTED = 'accepted';
export const CONSENT_REJECTED = 'rejected';
const CONSENT_LIFETIME_DAYS = 365;

// The cookie is untrusted input: anything other than the two known values
// counts as "no choice yet", so a tampered or stale value re-asks the visitor.
const readChoice = () => {
  const stored = cookie.get(CONSENT_COOKIE);
  return stored === CONSENT_ACCEPTED || stored === CONSENT_REJECTED ? stored : undefined;
};

// The stored choice only exists in the browser, so `ready` stays false during
// static generation and the first client render. That keeps the server HTML and
// the first hydration identical, and avoids flashing the banner at visitors who
// already chose.
export const useCookieConsent = () => {
  const [state, setState] = useState({ ready: false, choice: undefined });

  useEffect(() => {
    setState({ ready: true, choice: readChoice() });
  }, []);

  const choose = useCallback((choice) => {
    cookie.set(CONSENT_COOKIE, choice, { expires: CONSENT_LIFETIME_DAYS });
    setState({ ready: true, choice });
  }, []);

  // Withdrawing must be as easy as giving consent: forgetting the choice brings
  // the banner back and (via the layout) switches analytics off again.
  const reset = useCallback(() => {
    cookie.remove(CONSENT_COOKIE);
    setState({ ready: true, choice: undefined });
  }, []);

  return { ...state, choose, reset };
};
