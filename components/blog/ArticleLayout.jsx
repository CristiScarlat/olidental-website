import styles from '../../styles/blog.module.css';
import FrauncesFont from '../FrauncesFont';
import KeyTakeaways from './KeyTakeaways';
import FaqSection from './FaqSection';
import FounderBox from './FounderBox';
import ArticleCta from './ArticleCta';
import ArticleSidebar from './ArticleSidebar';
import RelatedPosts from './RelatedPosts';
import { BLOG_AUTHOR_LABEL, formatDateRo, getReadingMinutes } from '../../utils/blogPosts';

const HERO_SIZES = '(max-width: 1216px) calc(100vw - 2rem), 74rem';

// Anchors rendered by ArticleLayout itself (see KeyTakeaways / FaqSection).
// They are not article sections, so the contents list leaves them unnumbered.
const TAKEAWAYS_TOC_ITEM = { id: 'pe-scurt', label: 'Pe scurt', numbered: false };
const FAQ_TOC_ITEM = { id: 'intrebari-frecvente', label: 'Întrebări frecvente', numbered: false };

function buildToc(post, sections) {
  const hasTakeaways = Array.isArray(post.keyTakeaways) && post.keyTakeaways.length > 0;
  const hasFaq = Array.isArray(post.faq) && post.faq.length > 0;
  return [
    ...(hasTakeaways ? [TAKEAWAYS_TOC_ITEM] : []),
    ...(Array.isArray(sections) ? sections : []),
    ...(hasFaq ? [FAQ_TOC_ITEM] : []),
  ];
}

// Shared frame for every blog article: header (H1, byline, dates, reading
// time), a wide hero image, then the text column ("Pe scurt", the article
// body passed as children, FAQ, founder box, closing CTA, links to the other
// articles) next to a side column with the table of contents and booking.
// `sections` lists the article's own H2s ({ id, label }) for the table of
// contents.
const ArticleLayout = ({ post, sections, children }) => {
  const { heroImage } = post;
  const wasUpdated = post.dateModified !== post.datePublished;

  return (
    <article className={styles.article}>
      <FrauncesFont />
      <header className={styles.articleHeader}>
        <p className={styles.eyebrow}>{post.section}</p>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          <span>{BLOG_AUTHOR_LABEL}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.datePublished}>{formatDateRo(post.datePublished)}</time>
          <span aria-hidden="true">·</span>
          <span>{getReadingMinutes(post)} min de citit</span>
        </p>
      </header>

      <figure className={styles.hero}>
        <img
          src={heroImage.src}
          srcSet={heroImage.srcSet}
          sizes={HERO_SIZES}
          width={heroImage.width}
          height={heroImage.height}
          alt={heroImage.alt}
          fetchpriority="high"
          decoding="async"
        />
      </figure>

      <div className={styles.articleBody}>
        <ArticleSidebar toc={buildToc(post, sections)} />
        <div className={styles.paper}>
          <KeyTakeaways items={post.keyTakeaways} />
          <div className={styles.prose}>{children}</div>
          <FaqSection items={post.faq} />
          <FounderBox />
          <ArticleCta />
          <RelatedPosts currentSlug={post.slug} />
          {wasUpdated && (
            <p className={styles.updated}>
              Actualizat la <time dateTime={post.dateModified}>{formatDateRo(post.dateModified)}</time>
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleLayout;
