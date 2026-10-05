import styles from '../../styles/blog.module.css';
import FrauncesFont from '../../components/FrauncesFont';
import PostCard from '../../components/blog/PostCard';
import { BLOG_TITLE, getAllPosts } from '../../utils/blogPosts';
import { buildBlogIndexSeo } from '../../utils/blogSchema';

const BlogIndex = () => {
  const [latestPost, ...olderPosts] = getAllPosts();

  return (
    <div className={styles.indexPage}>
      <FrauncesFont />
      <header className={styles.indexHeader}>
        <h1>{BLOG_TITLE}</h1>
        <p>Povești și sfaturi despre sănătatea orală, de la echipa Olidental Clinic din Timișoara.</p>
      </header>
      {latestPost && <PostCard post={latestPost} featured />}
      {olderPosts.length > 0 && (
        <div className={styles.postGrid}>
          {olderPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

BlogIndex.seo = buildBlogIndexSeo(getAllPosts());

export default BlogIndex;
