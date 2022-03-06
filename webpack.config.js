/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const smp = new SpeedMeasurePlugin()

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = smp.wrap([
  {
    devtool: false,
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
                    corejs: "3",
                    modules: "auto",
                    targets: "last 1 Chrome major version",
                    useBuiltIns: "usage",
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    development: process.env.NODE_ENV !== "production",
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
    optimization: {
      minimizer: [new TerserPlugin({ /* additional options here */ })],
    },
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
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils", // Must be below test-utils
        "react/jsx-runtime": "preact/jsx-runtime",
      },
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    devtool: false,
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
            },
          },
        },
      ],
    },
    name: "server",
    optimization: {
      minimizer: [new TerserPlugin({ /* additional options here */ })],
    },
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
  },
]);
