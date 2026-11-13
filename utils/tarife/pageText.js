// Text of the /tarife page that is not a price row.
//
// The document title, subtitle and closing text come from the clinic's own
// document (./grupuri.js) and are used word for word. FROM_PRICE_EXPLANATION
// and PLAN_SENTENCE are sentences of that closing text, checked against it in
// tests/tarife/faq.test.mjs. Everything in AUTHORED_COPY is written for the
// page and must follow the CMSR advertising guide: no "de la", no "gratuit",
// no offers or guarantees.
import { DOCUMENT_SUBTITLE } from './grupuri.js';

// Visitors search for "prețuri" as often as for "tarife", so the heading, the lead and the
// FAQ title carry both words (the document itself says "Tarife Olidental Clinic").
export const PAGE_HEADING = 'Tarife și prețuri Olidental Clinic Timișoara';

export const PAGE_LEAD_INTRO = 'Tarifele și prețurile Olidental Clinic din Timișoara, în euro, pe categorii de tratament.';

export const PAGE_LEAD = `${PAGE_LEAD_INTRO} ${DOCUMENT_SUBTITLE}`;

export const NAV_LABEL = 'Categorii de tarife';

export const FAQ_HEADING = 'Întrebări frecvente despre tarife și prețuri';

export const FROM_PRICE_EXPLANATION = 'Prețurile „de la” reprezintă tariful de pornire al serviciului indicat.';

export const PLAN_SENTENCE =
  'După consultație și investigațiile necesare, veți primi un plan personalizat, cu etapele, serviciile incluse și costurile aferente, înainte de începerea tratamentului.';

export const AUTHORED_COPY = Object.freeze([PAGE_HEADING, PAGE_LEAD_INTRO, NAV_LABEL, FAQ_HEADING]);
