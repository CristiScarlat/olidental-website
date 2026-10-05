import Link from 'next/link';
import styles from '../../styles/blog.module.css';

const PHONE_HREF = 'tel:+40733023030';
const PHONE_LABEL = '0733 023 030';

// Closing call to action shown under every article.
const ArticleCta = () => (
  <aside className={styles.cta} aria-label="Programează o consultație">
    <p className={styles.ctaTitle}>Programează o consultație la Olidental Clinic</p>
    <p className={styles.ctaText}>
      Strada Ștefan cel Mare 53, Timișoara · Luni – Vineri, 09:30 – 18:30
    </p>
    <div className={styles.ctaActions}>
      <Link href="/programare" className={styles.ctaPrimary}>
        Programează-te online
      </Link>
      <a href={PHONE_HREF} className={styles.ctaSecondary}>
        Sună: {PHONE_LABEL}
      </a>
    </div>
  </aside>
);

export default ArticleCta;
