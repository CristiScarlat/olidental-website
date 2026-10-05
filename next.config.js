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

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport && { output: 'export' }),
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Redirects need the Next.js server, so a static export leaves them out.
  ...(!isStaticExport && {
    async redirects() {
      return [
        ...LEGACY_PROCEDURE_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
        { source: '/procedure/:path*', destination: '/servicii', permanent: true },
      ];
    },
  }),
}

module.exports = nextConfig
