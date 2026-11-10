// Visible FAQ of the /preturi page. Every number comes from the price data and
// every claim from the clinic document, so an answer cannot drift from the list.
// Plain text only: no FAQPage structured data (it is not used for this kind of page).
import { findRowByName } from './index.js';
import { formatEur, formatLei } from './format.js';
import { PRICE_STEPS } from './pageText.js';

const bothCurrencies = (row) => `${formatLei(row.lei)} (${formatEur(row.eur)})`;

export function buildFaq() {
  const consultation = findRowByName('Consultație');
  const consultationWithImaging = findRowByName('Consultație, radiografie panoramică, CBCT total și plan de tratament');
  const fourImplants = findRowByName('Dinți ficși pe 4 implanturi');
  const sixImplants = findRowByName('Dinți ficși pe 6 implanturi');

  return Object.freeze(
    [
      {
        question: 'Cât costă o consultație la Olidental Clinic din Timișoara?',
        answer: `Consultația costă ${bothCurrencies(consultation)}. Lista are și un rând care cuprinde consultația, radiografia panoramică, CBCT total și planul de tratament: ${bothCurrencies(consultationWithImaging)}.`,
      },
      {
        question: 'Ce include prețul unui implant dentar?',
        answer:
          'Tariful implantului acoperă implantul și inserarea lui. Componentele protetice și coroana se tarifează separat, iar tariful variază în funcție de sistemul implantar ales. Prețurile componentelor și ale coroanelor sunt în secțiunea Protetică pe implanturi.',
      },
      {
        question: 'Cât costă dinții ficși pe implanturi, pentru o arcadă?',
        answer: `Pe 4 implanturi, ${bothCurrencies(fourImplants)} pe arcadă. ${fourImplants.includes} Pe 6 implanturi, ${bothCurrencies(sixImplants)} pe arcadă, cu aceeași lucrare fixă, cele 6 implanturi, componentele protetice, adiția osoasă și A-PRF.`,
      },
      {
        question: 'Primesc un plan cu costurile înainte să încep tratamentul?',
        answer: `Da. ${PRICE_STEPS[1].text} ${PRICE_STEPS[2].text}`,
      },
    ].map((item) => Object.freeze(item)),
  );
}
