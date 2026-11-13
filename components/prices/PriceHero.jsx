import styles from '../../styles/tarife.module.css';
import { formatDateRo } from '../../utils/formatDate';
import { PRICE_GROUPS } from '../../utils/tarife';
import { NAV_LABEL, PAGE_HEADING, PAGE_LEAD } from '../../utils/tarife/pageText';

const QuickNav = () => (
  <nav className={styles.quickNav} aria-label={NAV_LABEL}>
    <ul className={styles.chips}>
      {PRICE_GROUPS.map(({ id, shortName }) => (
        <li key={id}>
          <a href={`#${id}`} className={styles.chip}>
            {shortName}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

/** `updated` is the page's real last-change date (YYYY-MM-DD, utils/pageDates.js). */
const PriceHero = ({ updated }) => (
  <header className={`${styles.shell} ${styles.hero}`}>
    <span className={styles.eyebrow}>Tarife</span>
    <h1 className={styles.heroTitle}>{PAGE_HEADING}</h1>
    <p className={styles.heroText}>{PAGE_LEAD}</p>
    <p className={styles.updated}>
      Ultima actualizare: <time dateTime={updated}>{formatDateRo(updated)}</time>.
    </p>
    <QuickNav />
  </header>
);

export default PriceHero;
