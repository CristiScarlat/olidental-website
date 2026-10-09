import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ro">
      {/* Fonts are self-hosted through next/font (pages/_app.js, components/FrauncesFont.jsx). */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
