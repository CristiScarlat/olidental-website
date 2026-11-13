import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFaq } from '../../utils/tarife/faq.js';
import { ALL_PRICE_ROWS, findGroup } from '../../utils/tarife/index.js';
import { CLOSING } from '../../utils/tarife/grupuri.js';
import { AUTHORED_COPY, FROM_PRICE_EXPLANATION, PLAN_SENTENCE } from '../../utils/tarife/pageText.js';

const faq = buildFaq();

test('the FAQ has four visible questions, each with an answer', () => {
  assert.equal(faq.length, 4);
  for (const item of faq) {
    assert.ok(item.question.endsWith('?'));
    assert.ok(item.answer.length > 40);
  }
});

test('the consultation answer uses the prices of the list', () => {
  const answer = faq[0].answer;
  assert.match(answer, /costă 40 €/);
  assert.match(answer, /130 €/);
});

test('the implant answer gives the price as the clinic writes it, and what "de la" means', () => {
  const answer = faq[1].answer;
  assert.match(answer, /de la 550 €\/implant/);
  assert.ok(answer.includes(FROM_PRICE_EXPLANATION));
});

test('the fixed-teeth answer has both arch prices and repeats the clinic note', () => {
  const answer = faq[2].answer;
  assert.match(answer, /3\.500 €\/arcadă/);
  assert.match(answer, /4\.800 €\/arcadă/);
  assert.ok(answer.includes(findGroup('implantologie').note));
  assert.match(answer, /compozit Blender/);
});

test('the plan answer repeats the sentence of the clinic document', () => {
  assert.ok(faq[3].answer.includes(PLAN_SENTENCE));
});

test('the sentences taken from the clinic closing text are really in it', () => {
  assert.ok(CLOSING.text.includes(FROM_PRICE_EXPLANATION));
  assert.ok(CLOSING.text.includes(PLAN_SENTENCE));
});

test('copy written for the page avoids the wording the CMSR guide bans', () => {
  const banned = /gratuit|garan[țt]|ofert[ăa]|promo[țt]|reducer|discount|cel mai|accesibil|avantaj|\bde la\b/i;
  // Prices and sentences of the clinic itself are not our copy, so they are taken out first.
  const clinicWords = [...ALL_PRICE_ROWS.map((row) => row.priceText), FROM_PRICE_EXPLANATION, PLAN_SENTENCE, findGroup('implantologie').note];
  const withoutClinicWords = (text) => clinicWords.reduce((rest, words) => rest.replaceAll(words, ''), text);
  const authored = [...AUTHORED_COPY, ...faq.flatMap((item) => [item.question, withoutClinicWords(item.answer)])];
  for (const text of authored) {
    assert.doesNotMatch(text, banned, text);
  }
});
