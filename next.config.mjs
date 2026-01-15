/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb"
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net'
            },
        ],
  },
  output: "standalone"
};

export default nextConfig;
