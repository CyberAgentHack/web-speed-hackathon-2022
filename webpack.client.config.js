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
            plugins: [
              [
                "babel-plugin-styled-components",
                {
                  displayName: false,
                  ssr: false,
                },
              ],
            ],
            presets: [
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
  ],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
