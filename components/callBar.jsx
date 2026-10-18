import { MdPhone } from "react-icons/md";
import styles from './styles/styles.module.css';
import { PHONE_DISPLAY, PHONE_HREF } from '../utils/clinicContact';

/**
 * Sticky "Sună acum" bar, visible only on mobile (see .callBar media query in
 * components/styles/styles.module.css). Before this, a working tel: link
 * appeared on only 2 of 20 pages (footer + /contact) — this makes it a
 * one-tap action from anywhere on the site, which matters most on the small
 * screens most patients actually browse from.
 */
const CallBar = () => {
  return (
    <a href={PHONE_HREF} className={styles.callBar}>
      <MdPhone size="1.25rem" />
      <span>Sună acum: {PHONE_DISPLAY}</span>
    </a>
  );
};

export default CallBar;
