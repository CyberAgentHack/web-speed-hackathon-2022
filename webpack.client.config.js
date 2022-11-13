/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require("zlib");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = {
  entry: path.join(SRC_ROOT, "client/index.jsx"),
  module: {
    rules: [
      {
        resourceQuery: (value) => {
          const query = new URLSearchParams(value);
          return query.has("raw");
        },
        type: "asset/source",
      },
      {
        exclude: /[\\/]esm[\\/]/,
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  name: "client",
  output: {
    path: DIST_PUBLIC,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
  optimization: {
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        zengin: {
          chunks: 'all',
          name: 'zengin',
          test: /[\\/]node_modules[\\/](zengin-code)[\\/]/,
        },
      },
      minSize: 2440,
    },
  },
};
