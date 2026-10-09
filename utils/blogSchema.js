// Schema.org (JSON-LD) and breadcrumb builders for the blog. Everything is
// derived from the article registry (utils/blogPosts.js), and entities shared
// with the rest of the site (the clinic, Dr. Oli) are referenced by the same
// @id that utils/schema.js already emits, so search engines see one connected
// graph instead of duplicate entities.
import {
  SITE_URL,
  DENTIST_ID,
  WEBSITE_ID,
  HOME_LABEL,
  personId,
  getFounder,
  buildBreadcrumbSchema,
  buildPersonSchema,
} from './schema';
import { BLOG_PATH, BLOG_TITLE, getPostUrlPath } from './blogPosts';

const BLOG_INDEX_SEO_TITLE = 'Blog stomatologic | Olidental Clinic Timișoara';
const BLOG_INDEX_DESCRIPTION =
  'Articolele echipei Olidental Clinic din Timișoara: povestea clinicii, tratamente stomatologice pe înțelesul tuturor și sfaturi pentru un zâmbet sănătos.';
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;
const BLOG_ID = `${BLOG_URL}#blog`;
const BLOG_LABEL = 'Blog';
const LANGUAGE = 'ro-RO';

function absolutePostUrl(post) {
  return `${SITE_URL}${getPostUrlPath(post)}`;
}

export function getBlogIndexBreadcrumbs() {
  return [
    { label: HOME_LABEL, href: '/' },
    { label: BLOG_LABEL, href: BLOG_PATH },
  ];
}

export function getPostBreadcrumbs(post) {
  return [...getBlogIndexBreadcrumbs(), { label: post.shortTitle, href: getPostUrlPath(post) }];
}

export function buildBlogIndexSchema(posts) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': BLOG_ID,
      name: BLOG_TITLE,
      url: BLOG_URL,
      inLanguage: LANGUAGE,
      publisher: { '@id': DENTIST_ID },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${absolutePostUrl(post)}#article`,
        headline: post.title,
        url: absolutePostUrl(post),
        datePublished: post.datePublished,
      })),
    },
    buildBreadcrumbSchema(getBlogIndexBreadcrumbs()),
  ];
}

function buildFaqSchema(post, url) {
  if (!Array.isArray(post.faq) || post.faq.length === 0) {
    return null;
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Full JSON-LD set for one article page: WebPage + BlogPosting + the founder
 * Person + BreadcrumbList + FAQPage (only when the article shows an FAQ).
 * The article is signed by the clinic team, so author/publisher both point
 * at the clinic entity; Dr. Oli is `mentions` (the story is about him).
 */
export function buildBlogPostSchema(post) {
  const url = absolutePostUrl(post);
  const founder = getFounder();
  const heroUrl = `${SITE_URL}${post.heroImage.src}`;
  const ogUrl = `${SITE_URL}${post.heroImage.og}`;

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: post.title,
    description: post.description,
    inLanguage: LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: heroUrl,
      width: post.heroImage.width,
      height: post.heroImage.height,
    },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    image: [heroUrl, ogUrl],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { '@id': DENTIST_ID },
    publisher: { '@id': DENTIST_ID },
    about: { '@id': DENTIST_ID },
    ...(founder ? { mentions: [{ '@id': personId(founder) }] } : {}),
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': BLOG_ID },
    articleSection: post.section,
    wordCount: post.wordCount,
    inLanguage: LANGUAGE,
  };

  const breadcrumb = {
    ...buildBreadcrumbSchema(getPostBreadcrumbs(post)),
    '@id': `${url}#breadcrumb`,
  };

  // The blog itself, so the article's isPartOf points at a node on this page.
  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': BLOG_ID,
    name: BLOG_TITLE,
    url: BLOG_URL,
    inLanguage: LANGUAGE,
    publisher: { '@id': DENTIST_ID },
  };

  return [
    webPage,
    article,
    blog,
    founder ? buildPersonSchema(founder) : null,
    breadcrumb,
    buildFaqSchema(post, url),
  ].filter(Boolean);
}

/** Props for components/layout.jsx (a page's static `.seo`) on /blog. */
export function buildBlogIndexSeo(posts) {
  return {
    title: BLOG_INDEX_SEO_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    canonical: BLOG_URL,
    schema: buildBlogIndexSchema(posts),
    breadcrumbs: getBlogIndexBreadcrumbs(),
  };
}

/** Props for components/layout.jsx (a page's static `.seo`) on an article. */
export function buildPostSeo(post) {
  return {
    title: post.seoTitle,
    description: post.description,
    canonical: absolutePostUrl(post),
    ogImage: `${SITE_URL}${post.heroImage.og}`,
    ogType: 'article',
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      section: post.section,
    },
    schema: buildBlogPostSchema(post),
    breadcrumbs: getPostBreadcrumbs(post),
  };
}
