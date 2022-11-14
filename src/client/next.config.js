const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif"],
  },
  compiler: {
    removeConsole: IS_PRODUCTION,
    // @see https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_API_HOST}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
