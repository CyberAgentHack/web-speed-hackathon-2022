/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool:
      process.env.NODE_ENV === "production" ? false : "inline-source-map",
    entry: path.join(SRC_ROOT, "index.jsx"),
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
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
          exclude: /node_modules/,
          test: /\.(js|jsx)?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        },
      ],
    },
    name: "client",
    optimization: {
      chunkIds: "named",
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          },
        }),
      ],
    },
    output: {
      filename: "[name].bundle.js",
      path: DIST_PUBLIC,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      // https://www.npmjs.com/package/imagemin-webp
      // new ImageminWebpWebpackPlugin({
      //   config: [
      //     {
      //       options: {
      //         method: 0, // 0 (fastest) and 6 (slowest).
      //         quality: 0, // 画質
      //         size: 1, //
      //       },
      //       test: /\.(png|jpe?g)$/i, // 対象ファイル
      //     },
      //   ],
      // }),
      // new BundleAnalyzerPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
];
