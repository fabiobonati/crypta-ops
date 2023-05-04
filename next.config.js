/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['assets.coingecko.com', 'cryptoicons.org'],
  },
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = nextConfig;
