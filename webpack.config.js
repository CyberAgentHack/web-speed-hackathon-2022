/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool: IS_DEVELOPMENT ? "inline-source-map" : false,
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    mode: "production",
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
                    bugfixes: true,
                    corejs: "3",
                    loose: true,
                    useBuiltIns: "usage",
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    development: process.env.BABEL_ENV === "development",
                    useSpread: true,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    name: "client",
    output: {
      filename: "main-[contenthash:8].js",
      path: DIST_PUBLIC,
      publicPath: "/",
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      new HtmlWebpackPlugin({
        inject: "body",
        scriptLoading: "defer",
        template: path.resolve(SRC_ROOT, "./client", "./index.html"),
      }),
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
                    bugfixes: true,
                    corejs: "3",
                    loose: true,
                    modules: "cjs",
                    useBuiltIns: "usage",
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    development: process.env.BABEL_ENV === "development",
                    useSpread: true,
                  },
                ],
              ],
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
  },
];
