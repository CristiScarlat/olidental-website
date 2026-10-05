import Link from 'next/link';
import styles from '../../styles/blog.module.css';

// Visible FAQ. The same `items` feed the FAQPage JSON-LD
// (utils/blogSchema.js), so page text and structured data always match.
const FaqSection = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className={styles.faq} aria-labelledby="intrebari-frecvente">
      <h2 id="intrebari-frecvente" className={styles.sectionTitle}>Întrebări frecvente</h2>
      {items.map((item) => (
        <div key={item.question} className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>{item.question}</h3>
          <p>{item.answer}</p>
          {item.link && (
            <Link href={item.link.href} className={styles.faqLink}>
              {item.link.label}
            </Link>
          )}
        </div>
      ))}
    </section>
  );
};

export default FaqSection;
