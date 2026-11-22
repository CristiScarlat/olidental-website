import { Html, Head, Main, NextScript } from "next/document";
import { buildConsentDefaultScript } from "../utils/analytics";

export default function Document() {
  return (
    <Html lang="ro">
      {/* Fonts are self-hosted through next/font (pages/_app.js, components/FrauncesFont.jsx). */}
      <Head>
        {/* Ownership check for the MedAtlas listing (medatlas.ro claim flow). */}
        <meta name="medatlas-site-verification" content="xOOCCjgNrR8jb5mlYv1V6_0wxcEij7xc" />
        {/* Consent Mode defaults must be set before gtag.js loads (components/layout.jsx). */}
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: buildConsentDefaultScript() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
