/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure CSS modules work properly
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
