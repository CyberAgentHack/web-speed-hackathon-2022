/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif"],
  },
  compiler: {
    // @see https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true,
    removeConsole: {
      exclude: ["error"],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
