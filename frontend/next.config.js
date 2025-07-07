/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CHAT_BASE_URL: process.env.NEXT_PUBLIC_CHAT_BASE_URL,
  },
  async rewrites() {
    if (isDev) {
      return [
        
        {
          source: '/chat/:path*',
          destination: 'http://localhost:8000/:path*', // Proxy para el chatbot
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;