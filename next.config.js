/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure CSS modules work properly
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
