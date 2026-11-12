// Text of the /tarife page that is not a price row.
//
// VERBATIM_TEXTS are sentences of the clinic's own document, used word for
// word (checked against the document when the data was imported). Everything
// in AUTHORED_COPY is written for the page and must follow the CMSR
// advertising guide: no "de la", no "gratuit", no offers or guarantees.

export const PAGE_HEADING = 'Lista de tarife Olidental Clinic Timișoara';

const BUDGET_SENTENCE = 'Tarifele afișate vă ajută să estimați bugetul tratamentului.';

export const PAGE_LEAD = `Lista de tarife a Olidental Clinic din Timișoara, pe categorii de tratament, în lei și în euro. ${BUDGET_SENTENCE}`;

export const SEARCH_LABEL = 'Caută un serviciu';
export const SEARCH_PLACEHOLDER = 'De exemplu: canal, CBCT, aparat dentar';

export const STEPS_HEADING = 'Cum se stabilește costul tratamentului';

export const PRICE_STEPS = Object.freeze(
  [
    {
      title: 'Consultația',
      text: 'Începem cu o evaluare și stabilim ce investigații sunt necesare.',
    },
    {
      title: 'Planul personalizat',
      text: 'După consultație și evaluarea investigațiilor necesare, vă prezentăm un plan personalizat, cu etapele, serviciile incluse și costurile aferente.',
    },
    {
      title: 'Costul, comunicat din timp',
      text: 'Costul planului propus vă este comunicat înainte de începerea tratamentului.',
    },
  ].map((step) => Object.freeze(step)),
);

export const FAQ_HEADING = 'Întrebări frecvente despre tarife';

export const CTA_TITLE = 'Vrei să afli costul pentru situația ta?';
export const CTA_BODY = 'După consultație primești un plan personalizat, cu etapele, serviciile incluse și costurile aferente.';

export const VERBATIM_TEXTS = Object.freeze([BUDGET_SENTENCE, ...PRICE_STEPS.map((step) => step.text)]);

export const AUTHORED_COPY = Object.freeze([
  PAGE_HEADING,
  PAGE_LEAD.replace(BUDGET_SENTENCE, ''),
  SEARCH_LABEL,
  SEARCH_PLACEHOLDER,
  STEPS_HEADING,
  ...PRICE_STEPS.map((step) => step.title),
  FAQ_HEADING,
  CTA_TITLE,
  CTA_BODY,
]);
