import Link from 'next/link';
import styles from '../../styles/doctorProfile.module.css';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/clinicContact';
import { toWebp } from '../../utils/images';

// Size of every team thumbnail (public/images/team/thumbnail_*).
const PORTRAIT = { width: 833, height: 1250 };

// Top of a doctor's page: portrait, name (the page's H1), role, a one-line
// introduction, key facts and the booking buttons.
const DoctorHero = ({ member, profile }) => (
  <header className={styles.hero}>
    <div className={styles.portrait}>
      <img
        src={toWebp(member.thumbnail)}
        alt={`${member.title}, medic la Olidental Clinic Timișoara`}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        fetchpriority="high"
        decoding="async"
      />
    </div>
    <div className={styles.heroText}>
      <p className={styles.eyebrow}>{profile.eyebrow}</p>
      <h1 className={styles.name}>{member.title}</h1>
      <p className={styles.role}>{profile.role}</p>
      <p className={styles.intro}>{profile.intro}</p>
      {profile.highlights?.length > 0 && (
        <dl className={styles.highlights}>
          {profile.highlights.map((item) => (
            <div key={item.label} className={styles.highlight}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className={styles.actions}>
        <Link href="/programare" className={styles.primary}>
          Programează o consultație
        </Link>
        <a href={PHONE_HREF} className={styles.secondary}>
          Sună: {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  </header>
);

export default DoctorHero;
