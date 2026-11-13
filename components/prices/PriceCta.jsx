import Link from 'next/link';
import styles from '../../styles/tarife.module.css';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/clinicContact';
import { CLOSING } from '../../utils/tarife/grupuri';

// The closing block of the clinic document: heading, text and the button, word for word.
// Calls to the phone number are counted site-wide as `click_to_call` (components/layout.jsx).
const PriceCta = () => (
  <section className={`${styles.shell} ${styles.section}`} aria-labelledby="plan-tratament">
    <div className={styles.cta}>
      <div className={styles.ctaText}>
        <h2 id="plan-tratament" className={styles.ctaTitle}>
          {CLOSING.heading}
        </h2>
        <p className={styles.ctaBody}>{CLOSING.text}</p>
      </div>
      <div className={styles.ctaActions}>
        <Link href="/programare" className={styles.ctaPrimary}>
          {CLOSING.ctaLabel}
        </Link>
        <a href={PHONE_HREF} className={styles.ctaSecondary}>
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  </section>
);

export default PriceCta;
