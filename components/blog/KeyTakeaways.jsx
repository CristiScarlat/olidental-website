import styles from '../../styles/blog.module.css';

// "Pe scurt" box: short, self-contained facts at the top of an article —
// the passage readers skim first and AI answers most often quote.
const KeyTakeaways = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <aside className={styles.takeaways} aria-labelledby="pe-scurt">
      <h2 id="pe-scurt" className={styles.takeawaysTitle}>Pe scurt</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};

export default KeyTakeaways;
