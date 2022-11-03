/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = {
  entry: path.join(SRC_ROOT, "client/index.jsx"),
  mode: "development",
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
                {
                  spec: true,
                },
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
    filename: "[name].bundle.js",
    path: DIST_PUBLIC,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
