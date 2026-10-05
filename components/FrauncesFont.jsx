import Head from 'next/head';

// Serif heading font used by the blog and /rezultate (plus
// the italic cut for pull quotes), loaded per page so the rest of the site
// doesn't pay for it.
const FRAUNCES_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,400&display=swap';

const FrauncesFont = () => (
  <Head>
    <link key="font-fraunces" rel="stylesheet" href={FRAUNCES_STYLESHEET} />
  </Head>
);

export default FrauncesFont;
