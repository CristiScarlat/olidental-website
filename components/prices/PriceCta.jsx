import Link from 'next/link';
import styles from '../../styles/tarife.module.css';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/clinicContact';
import { CTA_BODY, CTA_TITLE } from '../../utils/tarife/pageText';

// Calls to the phone number are counted site-wide as `click_to_call` (components/layout.jsx).
const PriceCta = () => (
  <section className={`${styles.shell} ${styles.section}`} aria-labelledby="programare-consultatie">
    <div className={styles.cta}>
      <div className={styles.ctaText}>
        <h2 id="programare-consultatie" className={styles.ctaTitle}>
          {CTA_TITLE}
        </h2>
        <p className={styles.ctaBody}>{CTA_BODY}</p>
      </div>
      <div className={styles.ctaActions}>
        <Link href="/programare" className={styles.ctaPrimary}>
          Programează o consultație
        </Link>
        <a href={PHONE_HREF} className={styles.ctaSecondary}>
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  </section>
);

export default PriceCta;
