import Link from 'next/link';
import styles from '../../styles/tarife.module.css';
import { PRICE_GROUPS } from '../../utils/tarife';
import IconTile from './IconTile';
import PriceTable from './PriceTable';

const GroupLinks = ({ links }) => (
  <ul className={styles.groupLinks}>
    {links.map((link) => (
      <li key={link.href}>
        <Link href={link.href} className={styles.groupLink}>
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      </li>
    ))}
  </ul>
);

/** One group of the clinic document: name, intro, price table, note, links. The first one spans the full width. */
const PriceGroup = ({ group, wide }) => (
  <section
    id={group.id}
    className={`${styles.group} ${wide ? styles.groupWide : ''}`}
    aria-labelledby={`${group.id}-titlu`}
  >
    <header className={styles.groupHead}>
      <IconTile categoryId={group.id} />
      <h2 id={`${group.id}-titlu`} className={styles.groupTitle}>
        {group.name}
      </h2>
    </header>
    {group.intro && <p className={styles.groupText}>{group.intro}</p>}
    <PriceTable group={group} />
    {group.note && <p className={styles.groupText}>{group.note}</p>}
    <GroupLinks links={group.links} />
  </section>
);

/** Every group is open and in the HTML, so search engines and AI assistants read the whole list. */
const PriceGroups = () => (
  <div className={`${styles.shell} ${styles.groups}`}>
    {PRICE_GROUPS.map((group, index) => (
      <PriceGroup key={group.id} group={group} wide={index === 0} />
    ))}
  </div>
);

export default PriceGroups;
