import Link from 'next/link';
import styles from '../../styles/doctorProfile.module.css';
import { teamCards } from '../../utils/uiConstants';
import { isDoctor, teamMemberPath } from '../../utils/team';
import { toWebp } from '../../utils/images';

const THUMBNAIL = { width: 833, height: 1250 };

// The other doctors, each linked to their own page or to their block on
// /echipa, then a link to the whole team.
const OtherDoctors = ({ member }) => {
  const others = teamCards.filter((other) => isDoctor(other) && other.title !== member.title);
  if (others.length === 0) {
    return null;
  }

  return (
    <section className={styles.team} aria-labelledby="echipa-medicala">
      <h2 id="echipa-medicala">Echipa medicală Olidental Clinic</h2>
      <ul className={styles.teamGrid}>
        {others.map((other) => (
          <li key={other.title}>
            <Link href={teamMemberPath(other)} className={styles.teamCard}>
              <img
                src={toWebp(other.thumbnail)}
                alt=""
                width={THUMBNAIL.width}
                height={THUMBNAIL.height}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.teamCardText}>
                <span className={styles.teamCardName}>{other.title}</span>
                {other.specializations?.[0] && (
                  <span className={styles.teamCardRole}>{other.specializations[0].trim()}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/echipa" className={styles.teamLink}>
        Vezi toată echipa Olidental Clinic
      </Link>
    </section>
  );
};

export default OtherDoctors;
