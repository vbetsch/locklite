// next.config.ts
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Accept-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
      ],
    },
  ],
  transpilePackages: ['@mui/material'],
};

export default nextConfig;
