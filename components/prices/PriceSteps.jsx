import styles from '../../styles/preturi.module.css';
import { PRICE_STEPS, STEPS_HEADING } from '../../utils/tarife/pageText';

/** How the cost of a treatment is set, in the clinic's own sentences. */
const PriceSteps = () => (
  <section className={styles.stepsBand} aria-labelledby="cost-tratament">
    <div className={styles.shell}>
      <h2 id="cost-tratament" className={styles.sectionTitle}>
        {STEPS_HEADING}
      </h2>
      <ol className={styles.steps}>
        {PRICE_STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default PriceSteps;
