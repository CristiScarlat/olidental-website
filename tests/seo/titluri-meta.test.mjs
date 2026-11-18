// Titles and meta descriptions of the top-level pages, read straight from the
// source files: every page has a unique title of at most 60 characters and a
// description of 70-160 characters, and the treatment pages carry their head
// term (the words people type into Google) in the title and the lead sentence.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PAGES_DIR = join(process.cwd(), 'pages');
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;

const length = (text) => [...text].length;

function readSeo(file) {
  const source = readFileSync(join(PAGES_DIR, file), 'utf8');
  const block = source.match(/\.seo\s*=\s*\{([\s\S]*?)\n\s*\};/);
  if (!block) return null;
  const field = (name) => {
    const match = block[1].match(new RegExp(`${name}:\\s*(["'\`])([\\s\\S]*?)\\1`));
    return match ? match[2] : null;
  };
  const lead = source.match(/<TreatmentLead>([\s\S]*?)<\/TreatmentLead>/);
  return { file, title: field('title'), description: field('description'), lead: lead ? lead[1] : null };
}

const pages = readdirSync(PAGES_DIR)
  .filter((file) => file.endsWith('.js'))
  .map(readSeo)
  .filter(Boolean);

// Head term that must appear in the title and in the lead sentence.
const HEAD_TERMS = {
  'implantologie.js': { title: ['Implant dentar', 'implantologie orală', 'Timișoara'], lead: ['Implant dentar'] },
  'fatete-coroane-ceramice.js': { title: ['Fațete dentare', 'coroane', 'Timișoara'], lead: ['Fațete dentare'] },
  'estetica-zambetului.js': { title: ['Estetică dentară', 'Timișoara'], lead: ['Estetică dentară'] },
  'restaurari-protetice-dentare.js': { title: ['Dinți pe implanturi'], lead: ['Dinți pe implanturi'] },
};

test('every page has a title and a description', () => {
  assert.ok(pages.length >= 10, `found only ${pages.length} pages with a seo block`);
  for (const page of pages) {
    assert.ok(page.title, `${page.file}: title is missing`);
    assert.ok(page.description, `${page.file}: description is missing`);
  }
});

test(`titles have at most ${TITLE_MAX} characters`, () => {
  for (const page of pages) {
    assert.ok(length(page.title) <= TITLE_MAX, `${page.file}: title has ${length(page.title)} characters: ${page.title}`);
  }
});

test('titles are unique', () => {
  const seen = new Map();
  for (const page of pages) {
    assert.ok(!seen.has(page.title), `${page.file} repeats the title of ${seen.get(page.title)}: ${page.title}`);
    seen.set(page.title, page.file);
  }
});

test(`descriptions have ${DESCRIPTION_MIN}-${DESCRIPTION_MAX} characters`, () => {
  for (const page of pages) {
    const size = length(page.description);
    assert.ok(size >= DESCRIPTION_MIN && size <= DESCRIPTION_MAX, `${page.file}: description has ${size} characters`);
  }
});

for (const [file, terms] of Object.entries(HEAD_TERMS)) {
  test(`${file} carries its head term in the title and the lead sentence`, () => {
    const page = pages.find((entry) => entry.file === file);
    assert.ok(page, `${file} has no seo block`);
    for (const term of terms.title) {
      assert.ok(page.title.includes(term), `${file}: the title lacks "${term}": ${page.title}`);
    }
    assert.ok(page.lead, `${file}: no <TreatmentLead> found`);
    for (const term of terms.lead) {
      assert.ok(page.lead.includes(term), `${file}: the lead sentence lacks "${term}"`);
    }
  });
}

test('the postcode matches the official one for Strada Ștefan cel Mare 53', () => {
  const files = ['components/location.jsx', 'components/footer.jsx', 'utils/schema.js'];
  for (const file of files) {
    const source = readFileSync(join(process.cwd(), file), 'utf8');
    assert.ok(source.includes('300116'), `${file}: postcode 300116 not found`);
    assert.ok(!source.includes('307200'), `${file}: the Ghiroda postcode 307200 is still there`);
  }
});
