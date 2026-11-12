import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa6';
import styles from '../../styles/tarifeList.module.css';
import { formatCount } from '../../utils/formatCount';
import { countRows } from '../../utils/tarife';
import { visibleBlockFlags } from '../../utils/tarife/search';
import FeaturedOffers from './FeaturedOffers';
import IconTile from './IconTile';
import PriceTable from './PriceTable';

const Block = ({ block, category, visibleIds }) => {
  if (block.type === 'table') {
    const caption = block.title ? `${category.name}: ${block.title}` : `Tarife pentru ${category.name}`;
    return <PriceTable block={block} caption={caption} visibleIds={visibleIds} />;
  }
  if (block.type === 'featured') {
    return <FeaturedOffers block={block} visibleIds={visibleIds} />;
  }
  return <p className={styles.blockNote}>{block.text}</p>;
};

const CategoryLinks = ({ links }) => (
  <ul className={styles.detailsLinks}>
    {links.map((link) => (
      <li key={link.href}>
        <Link href={link.href} className={styles.detailsLink}>
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      </li>
    ))}
  </ul>
);

/**
 * One category as an accordion. The whole price table is always in the HTML,
 * closed or open, so search engines and AI assistants read it either way.
 * While the visitor searches, blocks with no matching row are left out.
 */
const CategoryAccordion = ({ category, defaultOpen, hidden, visibleIds }) => {
  const shownBlocks = visibleBlockFlags(category.blocks, visibleIds);
  return (
    <details id={category.id} className={styles.details} open={defaultOpen} hidden={hidden}>
      <summary className={styles.summary}>
        <IconTile categoryId={category.id} className={styles.summaryIcon} />
        <h3 className={styles.summaryTitle}>{category.name}</h3>
        <span className={styles.summaryMeta}>{formatCount(countRows(category), 'serviciu', 'servicii')}</span>
        <span className={styles.chevron} aria-hidden="true">
          <FaChevronDown />
        </span>
      </summary>
      <div className={styles.detailsBody}>
        <p className={styles.detailsText}>{category.intro}</p>
        {category.blocks.map((block, index) =>
          shownBlocks[index] ? (
            <Block key={`${category.id}-block-${index}`} block={block} category={category} visibleIds={visibleIds} />
          ) : null,
        )}
        <CategoryLinks links={category.links} />
      </div>
    </details>
  );
};

export default CategoryAccordion;
