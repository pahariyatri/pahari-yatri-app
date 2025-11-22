/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Disable ESLint during production builds
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    // Keystatic configuration
    async rewrites() {
        return [
            {
                source: "/admin",
                destination: "/keystatic",
            },
        ];
    },
};

export default nextConfig;
