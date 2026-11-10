// The clinic price list as data: one source for the /preturi page, its
// JSON-LD and the FAQ answers. The numbers and wording live in
// ./categorii/*.js (generated from the clinic's own document); this file only
// adds ids and search keys and freezes everything.
import consultatii from './categorii/consultatii.js';
import igienizareAlbire from './categorii/igienizare-albire.js';
import cariiRestaurari from './categorii/carii-restaurari.js';
import endodontie from './categorii/endodontie.js';
import parodontologie from './categorii/parodontologie.js';
import chirurgieOrala from './categorii/chirurgie-orala.js';
import implantologie from './categorii/implantologie.js';
import proteticaDintiNaturali from './categorii/protetica-dinti-naturali.js';
import proteticaImplanturi from './categorii/protetica-implanturi.js';
import arcadeFixeImplanturi from './categorii/arcade-fixe-implanturi.js';
import protezeGutiere from './categorii/proteze-gutiere.js';
import ortodontie from './categorii/ortodontie.js';
import stomatologieCopii from './categorii/stomatologie-copii.js';
import { normalizeText } from './search.js';

// Same order as the clinic document.
const RAW_CATEGORIES = [
  consultatii,
  igienizareAlbire,
  cariiRestaurari,
  endodontie,
  parodontologie,
  chirurgieOrala,
  implantologie,
  proteticaDintiNaturali,
  proteticaImplanturi,
  arcadeFixeImplanturi,
  protezeGutiere,
  ortodontie,
  stomatologieCopii,
];

const rowsKey = (block) => (block.type === 'table' ? 'rows' : block.type === 'featured' ? 'items' : null);

const freezeAll = (list) => Object.freeze(list.map((item) => Object.freeze({ ...item })));

function buildBlock(block, category, nextIndex) {
  const key = rowsKey(block);
  if (!key) {
    return Object.freeze({ ...block });
  }
  const rows = block[key].map((row) => {
    const searchKey = normalizeText(`${row.name} ${row.includes ?? ''} ${category.name} ${category.shortName}`);
    return Object.freeze({ ...row, id: `${category.id}-${nextIndex()}`, categoryId: category.id, searchKey });
  });
  return Object.freeze({
    ...block,
    [key]: Object.freeze(rows),
    ...(block.cta ? { cta: freezeAll(block.cta) } : {}),
  });
}

// The card shows only the prices the clinic itself put forward: the range it
// wrote for fillings, or the rows it marked as featured.
function buildCardPrices(category, blocks) {
  if (category.cardPrices) {
    return freezeAll(category.cardPrices);
  }
  return Object.freeze(
    blocks
      .flatMap((block) => block[rowsKey(block)] ?? [])
      .filter((row) => row.onCard)
      .map(({ name, prefix, lei, eur, unit }) =>
        Object.freeze({ name, lei, eur, ...(prefix ? { prefix } : {}), ...(unit ? { unit } : {}) }),
      ),
  );
}

function buildCategory(category) {
  let counter = 0;
  const nextIndex = () => {
    counter += 1;
    return counter;
  };
  const blocks = Object.freeze(category.blocks.map((block) => buildBlock(block, category, nextIndex)));
  return Object.freeze({
    id: category.id,
    shortName: category.shortName,
    name: category.name,
    intro: category.intro,
    links: freezeAll(category.links),
    blocks,
    cardPrices: buildCardPrices(category, blocks),
  });
}

export const PRICE_CATEGORIES = Object.freeze(RAW_CATEGORIES.map(buildCategory));

/** Price rows of a category, in page order (tables and featured offers). */
export const rowsOf = (category) => category.blocks.flatMap((block) => block[rowsKey(block)] ?? []);

export const countRows = (category) => rowsOf(category).length;

export const ALL_PRICE_ROWS = Object.freeze(PRICE_CATEGORIES.flatMap(rowsOf));

/** First row with exactly this name. Throws, so a renamed row cannot silently break the FAQ. */
export function findRowByName(name) {
  const row = ALL_PRICE_ROWS.find((candidate) => candidate.name === name);
  if (!row) {
    throw new Error(`No price row named "${name}"`);
  }
  return row;
}
