/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     '/contact': { page: '/contact' },
  //     '/rezultate': { page: '/rezultate' },
  //     '/team': { page: '/team' },
  //     '/service': { page: '/service'},
  //     '/service/0': { page: '/service/[serviceId]'},
  //     '/service/1': { page: '/service/[serviceId]'},
  //     '/service/2': { page: '/service/[serviceId]'},
  //     '/procedure/0/0': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/0/1': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/0/2': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/0/3': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/1/0': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/1/1': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/2/0': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/2/1': { page: '/procedure/[serviceId]/[procedureIndex]'},
  //     '/procedure/2/2': { page: '/procedure/[serviceId]/[procedureIndex]'}
  //   }
  // },
}

module.exports = nextConfig
