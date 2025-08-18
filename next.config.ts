import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.VERCEL !== '1' && { output: 'standalone' }),
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
