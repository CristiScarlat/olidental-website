// Production (olidental.ro, DigitalOcean App Platform) runs as a Next.js
// server via `npm start`, which refuses to start with `output: 'export'`.
// Only the Netlify staging copy (../deploy-staging.sh) builds a static export,
// by setting STATIC_EXPORT=1.
const isStaticExport = process.env.STATIC_EXPORT === '1';

// Old /procedure/:serviceId/:procedureIndex pages (removed) -> their
// dedicated pages, so existing links and search results keep working.
const LEGACY_PROCEDURE_REDIRECTS = [
  ['/procedure/0/0', '/fatete-coroane-ceramice'],
  ['/procedure/0/1', '/restaurari-protetice'],
  ['/procedure/1/0', '/inserare-implant-aditii-os'],
  ['/procedure/1/1', '/restaurari-protetice-dentare'],
  ['/procedure/2/0', '/restaurari-extinse-dinti-naturali-implanturi'],
  ['/procedure/2/1', '/tratamente-multidisciplinare'],
];

// Security headers on every response. No CSP yet: the site loads GA, Google
// Maps, JotForm, reCAPTCHA and EmailJS, so a policy needs its own testing.
// HSTS leaves out includeSubDomains/preload until www.olidental.ro exists.
const SECURITY_HEADERS = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
];

// Files in public/ are served with max-age=0 by default, so every visit
// re-checked all images. Their names don't change when a photo is replaced,
// hence 30 days rather than a year. Cloudflare caches them on the same rule.
const IMAGE_CACHE_HEADERS = [
  { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport && { output: 'export' }),
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Redirects and headers need the Next.js server, so a static export leaves them out.
  ...(!isStaticExport && {
    async redirects() {
      return [
        ...LEGACY_PROCEDURE_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
        { source: '/procedure/:path*', destination: '/servicii', permanent: true },
      ];
    },
    async headers() {
      return [
        { source: '/:path*', headers: SECURITY_HEADERS },
        { source: '/images/:path*', headers: IMAGE_CACHE_HEADERS },
      ];
    },
  }),
}

module.exports = nextConfig
