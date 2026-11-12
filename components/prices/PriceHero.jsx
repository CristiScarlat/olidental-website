import styles from '../../styles/tarife.module.css';
import { formatDateRo } from '../../utils/formatDate';
import { PRICE_CATEGORIES } from '../../utils/tarife';
import { PAGE_HEADING, PAGE_LEAD } from '../../utils/tarife/pageText';
import PriceSearch from './PriceSearch';

const QuickNav = () => (
  <nav className={styles.quickNav} aria-label="Categorii de tarife">
    <ul className={styles.chips}>
      {PRICE_CATEGORIES.map(({ id, shortName }) => (
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
const PriceHero = ({ updated, query, onQueryChange, filter }) => (
  <header className={`${styles.shell} ${styles.hero}`}>
    <span className={styles.eyebrow}>Tarife</span>
    <h1 className={styles.heroTitle}>{PAGE_HEADING}</h1>
    <p className={styles.heroText}>{PAGE_LEAD}</p>
    <p className={styles.updated}>
      Ultima actualizare: <time dateTime={updated}>{formatDateRo(updated)}</time>.
    </p>
    <PriceSearch query={query} onQueryChange={onQueryChange} filter={filter} />
    <QuickNav />
  </header>
);

export default PriceHero;
