import Link from 'next/link';
import styles from '../../styles/doctorProfile.module.css';
import { NewTabHint } from './DoctorSections';

const PHONE_HREF = 'tel:+40733023030';
const PHONE_LABEL = '0733 023 030';

// Side column of a doctor's page: where they see patients and how to book
// (stays in view while scrolling on wide screens), then their public
// profiles elsewhere.
const DoctorSide = ({ profile }) => (
  <aside className={styles.side} aria-label={`Programare și profiluri ${profile.shortName}`}>
    <div className={styles.visit}>
      <p className={styles.visitTitle}>Consultă la Olidental Clinic</p>
      <address className={styles.visitDetails}>
        <span>Strada Ștefan cel Mare 53, Parter (intrare de pe Gh. Asachi), Timișoara</span>
        <span>Luni – Vineri, 09:30 – 18:30</span>
      </address>
      <Link href="/programare" className={styles.primary}>
        Programează-te online
      </Link>
      <a href={PHONE_HREF} className={styles.visitPhone}>
        sau sună la {PHONE_LABEL}
      </a>
    </div>
    {profile.profiles?.length > 0 && (
      <nav className={styles.profiles} aria-labelledby="profiluri-publice">
        <p id="profiluri-publice" className={styles.profilesTitle}>
          Profiluri publice
        </p>
        <ul>
          {profile.profiles.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
                <NewTabHint />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )}
  </aside>
);

export default DoctorSide;
