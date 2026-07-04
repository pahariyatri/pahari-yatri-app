/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Disable ESLint during production builds
        ignoreDuringBuilds: true,
    },
    // Hide the floating dev-mode indicator (the circular "N" badge shown only
    // during `next dev`). It never appears in production, but we hide it so it
    // doesn't distract during review.
    devIndicators: false,
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
