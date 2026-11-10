import Link from 'next/link';
import styles from '../../styles/preturiList.module.css';
import { formatNumber } from '../../utils/tarife/format';
import { Unit } from './PriceCells';

/** An offer the clinic presents as a card (implant, fixed teeth on 4 or 6 implants). */
const FeaturedCard = ({ item, visible, Heading }) => (
  <li className={styles.featuredCard} hidden={!visible}>
    <Heading className={styles.featuredName}>{item.name}</Heading>
    <p className={styles.featuredPrices}>
      <span className={styles.featuredLei}>
        {item.prefix && <span className={styles.priceAffix}>{item.prefix} </span>}
        {formatNumber(item.lei)}
        <span className={styles.priceAffix}> lei</span>
        <Unit unit={item.unit} />
      </span>
      <span className={styles.featuredEur}>
        {item.prefix ? `${item.prefix} ` : ''}
        {formatNumber(item.eur)} €
        <Unit unit={item.unit} />
      </span>
    </p>
    {item.includes && <p className={styles.featuredIncludes}>{item.includes}</p>}
  </li>
);

/** A block of featured offers, with the clinic's own links under it when it has them. */
const FeaturedOffers = ({ block, visibleIds }) => {
  const Heading = block.title ? 'h5' : 'h4';
  return (
    <div className={styles.featuredBlock}>
      {block.title && <h4 className={styles.blockTitle}>{block.title}</h4>}
      <ul className={styles.featuredGrid}>
        {block.items.map((item) => (
          <FeaturedCard key={item.id} item={item} visible={visibleIds.has(item.id)} Heading={Heading} />
        ))}
      </ul>
      {block.cta && (
        <p className={styles.featuredCta}>
          {block.cta.map((link, index) => (
            <span key={link.href + link.label}>
              {index > 0 && <span aria-hidden="true"> · </span>}
              <Link href={link.href} className={styles.inlineLink}>
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default FeaturedOffers;
