// Visible FAQ of the /tarife page. Every number comes from the price data and
// every claim from the clinic document, so an answer cannot drift from the list.
// Plain text only: no FAQPage structured data (it is not used for this kind of page).
import { findGroup, findRowByName } from './index.js';
import { FROM_PRICE_EXPLANATION, PLAN_SENTENCE } from './pageText.js';

export function buildFaq() {
  const consultation = findRowByName('Consultație');
  const consultationWithImaging = findRowByName('Consultație, radiografie panoramică, CBCT total și plan de tratament');
  const implant = findRowByName('Implant dentar cu inserare');
  const fourImplants = findRowByName('Dinți ficși pe 4 implanturi');
  const sixImplants = findRowByName('Dinți ficși pe 6 implanturi');
  const implantNote = findGroup('implantologie').note;

  return Object.freeze(
    [
      {
        question: 'Cât costă o consultație la Olidental Clinic din Timișoara?',
        answer: `Consultația costă ${consultation.priceText}. Tarifele includ și o poziție care cuprinde consultația, radiografia panoramică, CBCT total și planul de tratament: ${consultationWithImaging.priceText}.`,
      },
      {
        question: 'Cât costă un implant dentar?',
        answer: `Implantul dentar cu inserare are tariful ${implant.priceText}. ${FROM_PRICE_EXPLANATION}`,
      },
      {
        question: 'Cât costă dinții ficși pe implanturi, pentru o arcadă?',
        answer: `Dinții ficși pe 4 implanturi costă ${fourImplants.priceText}, iar pe 6 implanturi ${sixImplants.priceText}. ${implantNote}`,
      },
      {
        question: 'Primesc un plan cu costurile înainte să încep tratamentul?',
        answer: `Da. ${PLAN_SENTENCE}`,
      },
    ].map((item) => Object.freeze(item)),
  );
}
