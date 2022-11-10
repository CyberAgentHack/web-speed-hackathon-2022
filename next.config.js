const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  distDir: 'dist/client',
  compress: IS_PRODUCTION,
  swcMinify: IS_PRODUCTION,
  reactStrictMode: true,
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  }
}
