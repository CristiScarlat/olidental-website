import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import { formatDateRo, getPostUrlPath, getReadingMinutes } from '../../utils/blogPosts';

const CARD_SIZES = '(max-width: 700px) 100vw, 24rem';
const FEATURED_SIZES = '(max-width: 900px) 100vw, 42rem';

// One article teaser on the /blog index. `featured` is the wide card used
// for the latest article (photo beside the text on wide screens).
const PostCard = ({ post, featured = false }) => {
  const { heroImage } = post;

  return (
    <Link
      href={getPostUrlPath(post)}
      className={featured ? `${styles.card} ${styles.cardFeatured}` : styles.card}
    >
      <img
        src={heroImage.src}
        srcSet={heroImage.srcSet}
        sizes={featured ? FEATURED_SIZES : CARD_SIZES}
        width={heroImage.width}
        height={heroImage.height}
        alt={heroImage.alt}
        loading={featured ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className={styles.cardBody}>
        <p className={styles.cardMeta}>
          <time dateTime={post.datePublished}>{formatDateRo(post.datePublished)}</time>
          {' · '}
          {getReadingMinutes(post)} min de citit
        </p>
        <h2 className={styles.cardTitle}>{post.title}</h2>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <span className={styles.cardMore}>Citește articolul →</span>
      </div>
    </Link>
  );
};

export default PostCard;
