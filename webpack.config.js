/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const IMAGES_ROOT = abs("./images");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");
const DIST_IMAGES = abs("./dist/images");

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    mode: process.env.NODE_ENV,
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
          exclude: /\/esm\//,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
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
      path: DIST_PUBLIC,
      filename: "main.[fullhash].js",
      publicPath: "/"
    },
    plugins: [
      ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      new HtmlWebpackPlugin({
        title: "CyberTicket"
      })
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "cjs",
                    spec: true,
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
    plugins: [
      new CopyPlugin({
        patterns: [{ from: IMAGES_ROOT, to: DIST_IMAGES }],
      }),
    ],
  },
];
