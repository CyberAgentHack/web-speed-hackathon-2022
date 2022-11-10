/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: "../../dist/client",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
