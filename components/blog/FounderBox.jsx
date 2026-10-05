import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import { getFounder } from '../../utils/schema';

// Motto quoted in the founder's bio on /echipa (utils/uiConstants.js).
const FOUNDER_MOTTO = '„Nu există probleme, ci doar soluții!”';
const FOUNDER_PHOTO = { width: 833, height: 1250 };

// "Despre fondator": the founder's real credentials, read from the same team
// data the /echipa page renders, so the two can't disagree.
const FounderBox = () => {
  const founder = getFounder();
  if (!founder) {
    return null;
  }

  const specializations = (founder.specializations || []).map((item) => item.trim());

  return (
    <aside className={styles.founder} aria-labelledby="despre-fondator">
      <img
        src={founder.thumbnail}
        alt={`${founder.title}, fondatorul Olidental Clinic`}
        width={FOUNDER_PHOTO.width}
        height={FOUNDER_PHOTO.height}
        loading="lazy"
        decoding="async"
      />
      <div>
        <p id="despre-fondator" className={styles.founderLabel}>Despre fondator</p>
        <p className={styles.founderName}>{founder.title}</p>
        <ul>
          {specializations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.founderMotto}>{FOUNDER_MOTTO}</p>
        <Link href="/echipa" className={styles.founderLink}>
          Cunoaște echipa Olidental Clinic
        </Link>
      </div>
    </aside>
  );
};

export default FounderBox;
