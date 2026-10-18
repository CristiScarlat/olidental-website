import { Html, Head, Main, NextScript } from "next/document";
import { buildConsentDefaultScript } from "../utils/analytics";

export default function Document() {
  return (
    <Html lang="ro">
      {/* Fonts are self-hosted through next/font (pages/_app.js, components/FrauncesFont.jsx). */}
      <Head>
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
