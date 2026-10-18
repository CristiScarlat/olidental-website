import styles from './styles/treatmentPage.module.css';

// One factual sentence under a treatment page's H1 naming the treatment, the
// clinic and the city, so the first extracted passage says what the page is
// about. Site framing only: the clinic's own description stays below it.
const TreatmentLead = ({ children }) => (
  <p className={styles.lead}>{children}</p>
);

export default TreatmentLead;
