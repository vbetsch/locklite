import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/ui',
      },
    ];
  },
};

export default nextConfig;
