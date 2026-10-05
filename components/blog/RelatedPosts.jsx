import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import { formatDateRo, getAllPosts, getPostUrlPath, getReadingMinutes } from '../../utils/blogPosts';

const MAX_RELATED = 3;

// "Citește și": the newest other articles, so every article links to the
// rest of the blog (readers and crawlers can move between articles without
// going back to /blog).
const RelatedPosts = ({ currentSlug }) => {
  const others = getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, MAX_RELATED);

  if (others.length === 0) {
    return null;
  }

  return (
    <section className={styles.related} aria-labelledby="citeste-si">
      <h2 id="citeste-si" className={styles.sectionTitle}>Citește și</h2>
      <ul>
        {others.map((post) => (
          <li key={post.slug}>
            <Link href={getPostUrlPath(post)} className={styles.relatedLink}>
              {post.title}
            </Link>
            <p className={styles.relatedMeta}>
              <time dateTime={post.datePublished}>{formatDateRo(post.datePublished)}</time>
              {' · '}
              {getReadingMinutes(post)} min de citit
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;
