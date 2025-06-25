/* eslint-disable import/no-extraneous-dependencies */
import NextBundleAnalyzer from '@next/bundle-analyzer';
import app from './package.json' with { type: 'json' };

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com'
      }
    ]
  },
  generateBuildId: async () => {
    return app.version;
  }
};

if (process.env.NODE_ENV === 'development') {
  nextConfig.images.remotePatterns.push({
    protocol: 'http',
    hostname: '127.0.0.1'
  });
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzer(nextConfig);
