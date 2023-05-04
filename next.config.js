/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const nextConfig = {
  images: {
    domains: ['assets.coingecko.com', 'cryptoicons.org'],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

module.exports = nextConfig;
