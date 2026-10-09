import { Fraunces } from 'next/font/google';

// Serif heading font used by the blog and /rezultate (plus the italic cut for
// pull quotes). Self-hosted by next/font and imported only by those pages, so
// the rest of the site doesn't pay for it. Static 600 (headings) and italic
// 400 (quotes) cuts: the full variable font is ~120 KB per page and, like any
// preload, competed with the before/after photo that is the page's LCP.
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
});

const FrauncesFont = () => (
  <style jsx global>{`
    :root {
      --font-fraunces: ${fraunces.style.fontFamily};
    }
  `}</style>
);

export default FrauncesFont;
