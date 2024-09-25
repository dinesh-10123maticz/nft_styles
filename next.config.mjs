/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enables static export
  images: {
    unoptimized: true, 
    domains: [
      'localhost', 
      'example.com', 
      'anotherdomain.com',
      '192.53.121.26:7017', 
      'backend-nftsolana.maticz.in'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.53.121.26',
        port: '7017',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-nftsolana.maticz.in',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
