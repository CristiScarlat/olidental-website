import test from 'node:test';
import assert from 'node:assert/strict';
import { FAQ_HEADING, PAGE_HEADING, PAGE_LEAD, PAGE_LEAD_INTRO } from '../../utils/tarife/pageText.js';

// Visitors search for "tarife" and for "prețuri": the words that carry the page carry both.
const BOTH_WORDS = [/tarife/i, /prețuri/i];

test('the heading, the lead and the FAQ title use both "tarife" and "prețuri"', () => {
  for (const text of [PAGE_HEADING, PAGE_LEAD_INTRO, FAQ_HEADING]) {
    for (const word of BOTH_WORDS) {
      assert.match(text, word, text);
    }
  }
});

test('the heading names the clinic and the city, and the lead says the amounts are in euro', () => {
  assert.match(PAGE_HEADING, /Olidental Clinic Timișoara/);
  assert.match(PAGE_LEAD, /în euro/);
});
