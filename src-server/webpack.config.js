/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./server");
const DIST_ROOT = abs("./dist");

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool:
      process.env.NODE_ENV === "production" ? false : "inline-source-map",
    entry: path.join(SRC_ROOT, "index.js"),
    externals: [nodeExternals()],
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
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
      // typeorm scheme can not resolve
      minimize: false,
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
];
