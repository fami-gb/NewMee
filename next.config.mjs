/** @type {import('next').NextConfig} */
const nextConfig = {
  output: `export`,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
