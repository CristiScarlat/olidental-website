import styles from '../../styles/preturi.module.css';
import { formatCount } from '../../utils/formatCount';
import { PRICE_CATEGORIES, countRows } from '../../utils/tarife';
import { formatPriceValue } from '../../utils/tarife/format';
import IconTile from './IconTile';

// The first card (consultation) is wide on tablets and up; the implantology card,
// which carries three prices, is wide only in the three-column layout. That way
// no card is left alone on the last row at any width.
const WIDE_ALWAYS = 'consultatii';
const WIDE_ON_DESKTOP = 'implantologie';

/** "De la 3.180 lei / implant": the clinic's prefix and unit go with both currencies. */
const describePrice = (price, currency) =>
  `${price.prefix ? `${price.prefix} ` : ''}${formatPriceValue(currency === 'lei' ? price.lei : price.eur, currency)}${price.unit ? ` / ${price.unit}` : ''}`;

/** One featured price as the clinic gave it: name, then lei and euro. */
const CardPrice = ({ price }) => (
  <li className={styles.cardPrice}>
    <span className={styles.cardPriceName}>{price.name}</span>
    <span className={styles.cardPriceLei}>{describePrice(price, 'lei')}</span>
    <span className={styles.cardPriceEur}>{describePrice(price, '€')}</span>
  </li>
);

const OverviewCard = ({ category }) => {
  const wideClass = category.id === WIDE_ALWAYS ? styles.cardWide : category.id === WIDE_ON_DESKTOP ? styles.cardWideDesktop : '';
  return (
    <li className={`${styles.card} ${wideClass}`}>
      <div className={styles.cardHead}>
        <IconTile categoryId={category.id} />
        <h3 className={styles.cardTitle}>{category.name}</h3>
      </div>
      <p className={styles.cardCount}>{formatCount(countRows(category), 'serviciu', 'servicii')}</p>
      {category.cardPrices.length > 0 && (
        <ul className={styles.cardPrices}>
          {category.cardPrices.map((price) => (
            <CardPrice key={price.name} price={price} />
          ))}
        </ul>
      )}
      <a href={`#${category.id}`} className={styles.cardLink}>
        Vezi prețurile<span className={styles.srOnly}> pentru {category.name}</span> <span aria-hidden="true">→</span>
      </a>
    </li>
  );
};

/** Hidden while the visitor searches, so results come first. */
const CategoryCards = ({ hidden }) => (
  <section className={`${styles.shell} ${styles.section} ${styles.cardsSection}`} aria-labelledby="categorii" hidden={hidden}>
    <div className={styles.sectionHead}>
      <h2 id="categorii" className={styles.sectionTitle}>
        Categorii de tratament
      </h2>
      <p className={styles.sectionMeta}>{PRICE_CATEGORIES.length} categorii</p>
    </div>
    <ul className={styles.cards}>
      {PRICE_CATEGORIES.map((category) => (
        <OverviewCard key={category.id} category={category} />
      ))}
    </ul>
  </section>
);

export default CategoryCards;
