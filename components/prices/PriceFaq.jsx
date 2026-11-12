import styles from '../../styles/tarife.module.css';
import { buildFaq } from '../../utils/tarife/faq';
import { FAQ_HEADING } from '../../utils/tarife/pageText';

const FAQ = buildFaq();

/** Visible questions and answers (plain text, no accordion, no FAQPage markup). */
const PriceFaq = () => (
  <section className={`${styles.shell} ${styles.section}`} aria-labelledby="intrebari-tarife">
    <h2 id="intrebari-tarife" className={styles.sectionTitle}>
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
