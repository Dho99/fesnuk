import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: {
      bodySizeLimit: '5mb'
    },
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: false
      }
    ]
  }
};

export default nextConfig;
