import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import { GoogleAnalytics } from '@next/third-parties/google';
//import CookieConsent from "react-cookie-consent";
import TopBar from "./topBar";
import CookieConsentBanner from './cookieConsent';
import CallBar from './callBar';
import JsonLd from './JsonLd';
import Breadcrumbs from './breadcrumbs';
import { getSchemaForRoute, getBreadcrumbItems } from '../utils/schema';
import { useCookieConsent, CONSENT_ACCEPTED } from '../utils/useCookieConsent';
import { GA_MEASUREMENT_ID, applyAnalyticsConsent } from '../utils/analytics';

const DEFAULT_TITLE = "Olidental Clinic Timișoara - Servicii stomatologice premium în Timișoara";
const DEFAULT_DESCRIPTION = "Olidental Clinic Timișoara oferă servicii stomatologice premium, doctorii clinicii având specialități și competențe pentru o gamă cuprinzătoare de tratamente dentare.";
const DEFAULT_CANONICAL = "https://olidental.ro";
// Fallback social-share image for every page that doesn't pass its own
// `ogImage`: 1200×630, the size WhatsApp/Facebook/LinkedIn expect (generated
// by scripts/generate-share-images.js). The old fallback was the 345×100
// logo, which previews stretched into a blurry green block.
const DEFAULT_OG_IMAGE = "https://olidental.ro/images/og/olidental-clinic-1200x630.jpg";
const DEFAULT_OG_IMAGE_ALT = "Recepția Olidental Clinic din Timișoara, cu logoul clinicii";
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";

// Optional page-level extras (all set through a page's static `.seo` object):
// - ogType: 'article' for blog posts (default 'website')
// - article: { publishedTime, modifiedTime, section } -> article:* meta tags
// - schema: extra JSON-LD objects emitted after the route-derived ones
// - breadcrumbs: visible trail ({ label, href }[]) for pages that
//   utils/schema.js doesn't know about (e.g. the blog)
const Layout = ({ children, title, description, canonical, ogImage, noindex, ogType, article, schema, breadcrumbs }) => {
  const { pathname } = useRouter();
  const { ready: consentReady, choice: consentChoice, choose: chooseConsent, reset: resetConsent } = useCookieConsent();
  const analyticsAllowed = consentChoice === CONSENT_ACCEPTED;

  // Only a banner reopened from the footer takes focus; on a first visit it
  // must not interrupt whatever the visitor is doing.
  const [bannerReopened, setBannerReopened] = useState(false);
  const openCookieSettings = useCallback(() => {
    setBannerReopened(true);
    resetConsent();
  }, [resetConsent]);

  // Keep Google Analytics in step with the visitor's choice: withdrawing (or
  // never giving) consent must stop collection right away and drop old cookies.
  useEffect(() => {
    if (consentReady) applyAnalyticsConsent(analyticsAllowed);
  }, [consentReady, analyticsAllowed]);

  const pageTitle = title || DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageCanonical = canonical || DEFAULT_CANONICAL;
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE;
  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const pageOgType = ogType || "website";
  const structuredData = [...getSchemaForRoute(pathname), ...(Array.isArray(schema) ? schema : [])];
  const breadcrumbItems = breadcrumbs || getBreadcrumbItems(pathname);

  return (
    <>
      <JsonLd schema={structuredData} />
      <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta key="robots" name="robots" content={robotsContent}/>

          <title>{pageTitle}</title>
          <link rel="icon" href="/favicons/cropped-favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" href="/favicons/cropped-favicon-192x192.png" sizes="192x192"/>
          <link rel="apple-touch-icon" href="/favicons/cropped-favicon-180x180.png"/>
          <meta name="msapplication-TileImage" content="/favicons/cropped-favicon-270x270.png"/>
          <meta key="description" name="description" content={pageDescription}/>
          <link key="canonical" rel="canonical" href={pageCanonical}/>
          <meta property="og:locale" content="ro_RO"/>
          <meta key="og:type" property="og:type" content={pageOgType}/>
          <meta key="og:title" property="og:title" content={pageTitle}/>
          <meta key="og:description" property="og:description" content={pageDescription}/>
          <meta key="og:url" property="og:url" content={pageCanonical}/>
          <meta property="og:site_name" content="Olidental Clinic"/>
          <meta key="og:image" property="og:image" content={pageOgImage}/>
          {/* Every share image on the site (default and blog posts) is 1200×630. */}
          <meta key="og:image:width" property="og:image:width" content={OG_IMAGE_WIDTH}/>
          <meta key="og:image:height" property="og:image:height" content={OG_IMAGE_HEIGHT}/>
          {!ogImage && <meta key="og:image:alt" property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT}/>}
          {article?.publishedTime && <meta key="article:published_time" property="article:published_time" content={article.publishedTime}/>}
          {article?.modifiedTime && <meta key="article:modified_time" property="article:modified_time" content={article.modifiedTime}/>}
          {article?.section && <meta key="article:section" property="article:section" content={article.section}/>}
          <meta key="twitter:card" name="twitter:card" content="summary_large_image"/>
          <meta key="twitter:title" name="twitter:title" content={pageTitle}/>
          <meta key="twitter:description" name="twitter:description" content={pageDescription}/>
          <meta key="twitter:image" name="twitter:image" content={pageOgImage}/>
          <meta name="google-site-verification" content="ZVnPRWdYCBKwPcZw_fc719GdddRhNEy8wIiq5abL6hM" />
      </Head>

      <Header />
      <main  className="content">
        {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
        {children}
      </main>
      {/*<TopBar />*/}
      <Footer onOpenCookieSettings={openCookieSettings} />
      <CallBar />
      {consentReady && !consentChoice && <CookieConsentBanner onChoose={chooseConsent} autoFocus={bannerReopened} />}
      {analyticsAllowed && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </>
  );
};

export default Layout;
