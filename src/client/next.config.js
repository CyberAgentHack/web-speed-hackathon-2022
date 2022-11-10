/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: "../../dist/client",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/webp"]
  }
};

module.exports = nextConfig;
