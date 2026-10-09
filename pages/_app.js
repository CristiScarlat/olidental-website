import { useEffect, useContext } from "react";
import { Exo_2 } from 'next/font/google';
import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

// Self-hosted by next/font. Same two weights the old Google Fonts link loaded;
// latin-ext carries ă, ș, ț. Not preloaded so the fonts don't take bandwidth
// from each page's main image; next/font's size-matched fallback avoids a
// layout shift when Exo 2 swaps in.
const exo2 = Exo_2({ subsets: ['latin', 'latin-ext'], weight: ['400', '600'], display: 'swap', preload: false });

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-exo2: ${exo2.style.fontFamily};
        }
      `}</style>
      <Layout {...Component.seo}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
