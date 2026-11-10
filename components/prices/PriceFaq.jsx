import styles from '../../styles/preturi.module.css';
import { buildFaq } from '../../utils/tarife/faq';
import { FAQ_HEADING } from '../../utils/tarife/pageText';

const FAQ = buildFaq();

/** Visible questions and answers (plain text, no accordion, no FAQPage markup). */
const PriceFaq = () => (
  <section className={`${styles.shell} ${styles.section}`} aria-labelledby="intrebari-preturi">
    <h2 id="intrebari-preturi" className={styles.sectionTitle}>
      {FAQ_HEADING}
    </h2>
    <div className={styles.faq}>
      {FAQ.map((item) => (
        <div key={item.question} className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>{item.question}</h3>
          <p className={styles.faqAnswer}>{item.answer}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PriceFaq;
