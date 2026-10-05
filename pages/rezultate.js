import Link from 'next/link';
import styles from '../styles/rezultateHub.module.css';
import FrauncesFont from '../components/FrauncesFont';
import BeforeAfterSlider from '../components/beforeAfterSlider';
import ResultsDisclaimer from '../components/resultsDisclaimer';
import { GOOGLE_MAPS_URL, GOOGLE_RATING } from '../utils/schema';
import {
  RESULT_CATEGORIES,
  findCaseByTitle,
  getAllResultCases,
  getCasesInCategory,
  getCaseImagePair,
  getCaseSectionText,
  getCategoryPath,
} from '../utils/resultCases';
import { formatCount } from '../utils/formatCount';

// The case shown large at the top, with the drag slider. Change the title to
// feature another case from utils/uiConstants.js (beforeAfter).
const FEATURED_CASE_TITLE = 'Reabilitare orală complexă a tuturor dinților';
const PHOTO_SIZE = { width: 862, height: 485 };
const PHONE_HREF = 'tel:+40733023030';
const PHONE_LABEL = '0733 023 030';

const STEPS = [
  { title: 'Consultație și fotografii', text: 'Evaluăm situația și fotografiem punctul de plecare.' },
  { title: 'Plan de tratament', text: 'Îți explicăm opțiunile, etapele și ce presupune fiecare.' },
  { title: 'Tratament etapizat', text: 'Lucrăm pas cu pas, cu tehnici minim invazive.' },
  { title: 'Control și întreținere', text: 'Verificăm rezultatul și îți arătăm cum să-l păstrezi.' },
];

function formatCases(count) {
  return formatCount(count, 'caz', 'cazuri');
}

const StatsBar = ({ caseCount }) => (
  <div className={styles.stats}>
    <div className={styles.stat}>
      <span className={styles.statValue}>{caseCount}</span>
      <span className={styles.statLabel}>cazuri documentate</span>
    </div>
    <div className={styles.stat}>
      <span className={styles.statValue}>{RESULT_CATEGORIES.length}</span>
      <span className={styles.statLabel}>categorii de tratament</span>
    </div>
    <a className={styles.stat} href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
      <span className={styles.statValue}>★ {GOOGLE_RATING.value}</span>
      <span className={styles.statLabel}>din {formatCount(GOOGLE_RATING.count, 'recenzie', 'recenzii')} Google</span>
    </a>
  </div>
);

const FeaturedCase = () => {
  const featured = findCaseByTitle(FEATURED_CASE_TITLE) || getAllResultCases()[0];
  const pair = getCaseImagePair(featured);
  if (!featured || !pair) {
    return null;
  }

  const category = RESULT_CATEGORIES.find((c) => c.slug === featured.resultCategory);
  const categoryCount = getCasesInCategory(featured.resultCategory).length;
  const challenge = getCaseSectionText(featured, 'Provocarea');
  const result = getCaseSectionText(featured, 'Rezultatul');

  return (
    <section className={styles.featured} aria-labelledby="caz-reprezentativ">
      <div className={styles.featuredCard}>
        <div className={styles.featuredMedia}>
          <BeforeAfterSlider
            beforeSrc={pair.before}
            afterSrc={pair.after}
            alt={featured.title}
            width={PHOTO_SIZE.width}
            height={PHOTO_SIZE.height}
            label="Compară fotografia de dinainte cu cea de după tratament"
          />
          <p className={styles.sliderHint}>Trage de bara din mijloc ca să compari.</p>
        </div>
        <div className={styles.featuredText}>
          <span className={styles.eyebrow}>Caz reprezentativ</span>
          <h2 id="caz-reprezentativ" className={styles.featuredTitle}>{featured.title}</h2>
          {category && <span className={styles.pill}>{category.label}</span>}
          {challenge && <p><strong>Provocarea.</strong> {challenge}</p>}
          {result && <p><strong>Rezultatul.</strong> {result}</p>}
          {category && (
            <Link href={getCategoryPath(category)} className={styles.outlineButton}>
              Vezi toate cele {formatCases(categoryCount)} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

const ProblemChips = () => (
  <section className={styles.section} aria-labelledby="ce-vrei-sa-rezolvi">
    <h2 id="ce-vrei-sa-rezolvi" className={styles.sectionTitle}>Ce vrei să rezolvi?</h2>
    <div className={styles.chips}>
      {RESULT_CATEGORIES.map((category) => (
        <Link key={category.slug} href={getCategoryPath(category)} className={styles.chip}>
          <span className={styles.chipLabel}>{category.chip}</span>
          <span className={styles.chipCategory}>{category.label} →</span>
        </Link>
      ))}
    </div>
  </section>
);

const CategoryCard = ({ category }) => {
  const cases = getCasesInCategory(category.slug);
  const pair = getCaseImagePair(cases[0]);

  return (
    <Link href={getCategoryPath(category)} className={styles.card}>
      <div className={styles.cardImages}>
        {pair && (
          <>
            <img src={pair.before} alt={`${category.label}: exemplu înainte de tratament`} width={PHOTO_SIZE.width} height={PHOTO_SIZE.height} loading="lazy" decoding="async" />
            <img src={pair.after} alt={`${category.label}: exemplu după tratament`} width={PHOTO_SIZE.width} height={PHOTO_SIZE.height} loading="lazy" decoding="async" />
          </>
        )}
        <span className={styles.countBadge}>{formatCases(cases.length)}</span>
        <span className={`${styles.imageTag} ${styles.imageTagBefore}`}>Înainte</span>
        <span className={`${styles.imageTag} ${styles.imageTagAfter}`}>După</span>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardProblem}>{category.problem}</span>
        <h3 className={styles.cardTitle}>{category.label}</h3>
        <p className={styles.cardTeaser}>{category.teaser}</p>
        <span className={styles.cardMore}>Vezi cele {formatCases(cases.length)} →</span>
      </div>
    </Link>
  );
};

const Results = () => {
  const caseCount = getAllResultCases().length;

  return (
    <div className={styles.page}>
      <FrauncesFont />

      <header className={styles.hero}>
        <span className={styles.heroEyebrow}>Cazuri reale, înainte și după</span>
        <h1 className={styles.heroTitle}>Rezultatele pacienților noștri</h1>
        <p className={styles.heroText}>
          Fotografii reale din tratamentele făcute la Olidental Clinic. Alege situația care ți se
          potrivește și vezi cum a arătat zâmbetul înainte și după.
        </p>
        <StatsBar caseCount={caseCount} />
      </header>

      <FeaturedCase />
      <ProblemChips />

      <section className={styles.section} aria-labelledby="toate-categoriile">
        <div className={styles.sectionHead}>
          <h2 id="toate-categoriile" className={styles.sectionTitle}>Toate categoriile</h2>
          <span className={styles.sectionMeta}>
            {formatCases(caseCount)} în {RESULT_CATEGORIES.length} categorii
          </span>
        </div>
        <div className={styles.cards}>
          {RESULT_CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className={styles.steps} aria-labelledby="cum-lucram">
        <div className={styles.stepsInner}>
          <h2 id="cum-lucram" className={styles.sectionTitle}>Cum lucrăm</h2>
          <p className={styles.stepsIntro}>Fiecare rezultat de mai sus a urmat aceiași pași.</p>
          <ol className={styles.stepList}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepTitle}>{step.title}</span>
                <span className={styles.stepText}>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.cta}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Vrei un rezultat asemănător?</h2>
            <p>
              Primul pas este o consultație. Îți evaluăm situația și îți explicăm opțiunile, pe
              înțelesul tău.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/programare" className={styles.ctaPrimary}>Programează o evaluare</Link>
            <a href={PHONE_HREF} className={styles.ctaSecondary}>{PHONE_LABEL}</a>
          </div>
        </div>
        <ResultsDisclaimer />
      </section>
    </div>
  );
};

Results.seo = {
  title: "Rezultatele pacienților noștri | Olidental Clinic Timișoara",
  description: "Cazuri reale de tratamente stomatologice la Olidental Clinic Timișoara, grupate pe categorie: fațete și coroane ceramice, estetică gingivală, implantologie, reabilitare orală completă.",
  canonical: "https://olidental.ro/rezultate",
};

export default Results;
