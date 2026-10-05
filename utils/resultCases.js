// Read helpers over the before/after cases in utils/uiConstants.js, used by
// the /rezultate hub. The case data stays the single source: counts, teaser
// photos and the featured case's text are all derived from it.
import { beforeAfter } from './uiConstants';

export const RESULTS_HUB_PATH = '/rezultate';
const IMAGE_DIR = '/images/beforeAfter';

/** The 4 result categories, each with its own page under /rezultate/. */
export const RESULT_CATEGORIES = [
  {
    slug: 'fatete-coroane-ceramice',
    label: 'Fațete și coroane ceramice',
    problem: 'Dinți inestetici, coroane vechi',
    chip: 'Coroane vechi sau dinți inestetici',
    teaser: 'Corectarea formei și culorii dinților cu fațete și coroane integral ceramice.',
  },
  {
    slug: 'estetica-gingivala',
    label: 'Estetică gingivală',
    problem: 'Gingia se vede prea mult',
    chip: 'Gingia se vede prea mult',
    teaser: 'Reechilibrarea raportului dintre dinți și gingie prin chirurgie gingivală.',
  },
  {
    slug: 'implantologie',
    label: 'Implantologie',
    problem: 'Dinți lipsă sau implanturi eșuate',
    chip: 'Îmi lipsesc dinți',
    teaser: 'Înlocuirea dinților lipsă și corectarea unor tratamente eșuate cu implanturi dentare.',
  },
  {
    slug: 'reabilitare-orala-completa',
    label: 'Reabilitare orală completă',
    problem: 'Mulți dinți afectați',
    chip: 'Mulți dinți afectați',
    teaser: 'Cazuri complexe, cu tratament etapizat pe una sau ambele arcade dentare.',
  },
];

export function getCategoryPath(category) {
  return `${RESULTS_HUB_PATH}/${category.slug}`;
}

export function getAllResultCases() {
  return Array.isArray(beforeAfter) ? beforeAfter.filter((c) => c && c.resultCategory) : [];
}

export function getCasesInCategory(slug) {
  return getAllResultCases().filter((c) => c.resultCategory === slug);
}

export function findCaseByTitle(title) {
  return getAllResultCases().find((c) => c.title === title) || null;
}

/** First and last photo of one image batch ({ before, after } paths), or
 * null when the case has no usable pair. */
export function getCaseImagePair(caseItem, batchIndex = 0) {
  const batch = caseItem?.images?.[batchIndex];
  if (!Array.isArray(batch) || batch.length < 2) {
    return null;
  }
  return {
    before: `${IMAGE_DIR}/thumbnail_${batch[0]}`,
    after: `${IMAGE_DIR}/thumbnail_${batch[batch.length - 1]}`,
  };
}

/** Plain text of one "<strong>Label:</strong> …" paragraph of a case
 * description. */
export function getCaseSectionText(caseItem, label) {
  const description = typeof caseItem?.description === 'string' ? caseItem.description : '';
  const match = description.match(new RegExp(`<strong>${label}:</strong>([\\s\\S]*?)</p>`));
  if (!match) {
    return '';
  }
  return match[1]
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
