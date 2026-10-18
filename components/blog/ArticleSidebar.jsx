import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/clinicContact';

// Side column of an article. On wide screens it sits to the right of the
// text and stays visible while scrolling (table of contents + booking); on
// phones and tablets it is shown above the text with the contents only (the
// closing CTA and the mobile call bar already cover booking there).
const ArticleSidebar = ({ toc }) => (
  <aside className={styles.sidebar} aria-label="Cuprins și programare">
    {Array.isArray(toc) && toc.length > 0 && (
      <nav className={styles.toc} aria-labelledby="cuprins">
        <p id="cuprins" className={styles.tocTitle}>Cuprins</p>
        <ol>
          {toc.map((item) => (
            <li key={item.id} className={item.numbered === false ? styles.tocExtra : undefined}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ol>
      </nav>
    )}
    <div className={styles.sidebarCta}>
      <p className={styles.sidebarCtaTitle}>Programează o consultație</p>
      <Link href="/programare" className={styles.ctaPrimary}>
        Programează-te online
      </Link>
      <a href={PHONE_HREF} className={styles.sidebarPhone}>
        sau sună la {PHONE_DISPLAY}
      </a>
    </div>
  </aside>
);

export default ArticleSidebar;
