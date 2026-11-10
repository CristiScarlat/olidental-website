import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFaq } from '../../utils/tarife/faq.js';
import { AUTHORED_COPY, PRICE_STEPS, VERBATIM_TEXTS } from '../../utils/tarife/pageText.js';

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
  assert.match(answer, /210 lei \(40 €\)/);
  assert.match(answer, /690 lei \(130 €\)/);
});

test('the implant answer repeats the clinic notes and names no price', () => {
  const answer = faq[1].answer;
  assert.match(answer, /acoperă implantul și inserarea lui/);
  assert.match(answer, /se tarifează separat/);
  assert.doesNotMatch(answer, /\d/);
});

test('the fixed-teeth answer has both arch prices and what they include', () => {
  const answer = faq[2].answer;
  assert.match(answer, /18\.550 lei \(3\.500 €\)/);
  assert.match(answer, /25\.440 lei \(4\.800 €\)/);
  assert.match(answer, /compozit Blender/);
});

test('the plan answer repeats the two sentences of the clinic document', () => {
  const answer = faq[3].answer;
  assert.ok(answer.includes(PRICE_STEPS[1].text));
  assert.ok(answer.includes(PRICE_STEPS[2].text));
});

test('copy written for the page avoids the wording the CMSR guide bans', () => {
  const banned = /gratuit|garan[țt]|ofert[ăa]|promo[țt]|reducer|discount|cel mai|accesibil|avantaj|\bde la\b/i;
  const authored = [...AUTHORED_COPY, ...faq.flatMap((item) => [item.question, item.answer.replaceAll('Include', '')])];
  for (const text of authored) {
    assert.doesNotMatch(text, banned, text);
  }
});

test('the texts taken from the clinic document are listed for the verbatim check', () => {
  assert.ok(VERBATIM_TEXTS.length >= 4);
  for (const text of VERBATIM_TEXTS) {
    assert.ok(text.length > 20);
  }
});
