import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
            }
        ],
    },
    output: "standalone",
    cacheComponents: true
};

export default nextConfig;