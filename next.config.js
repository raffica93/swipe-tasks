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
  // Optimize CSS/SASS handling
  optimizeFonts: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { dev, isServer }) => {
    // CSS handling optimization
    if (!isServer && !dev) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
          priority: 10,
        },
      };
    }
    return config;
  },
  experimental: {
    optimizeCss: true // Enable CSS optimization
  }
};

module.exports = nextConfig;
