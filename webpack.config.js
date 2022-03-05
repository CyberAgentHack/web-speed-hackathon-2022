/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool:
      process.env.NODE_ENV === "production" ? false : "inline-source-map",
    entry: {
      main: [
        "core-js",
        "regenerator-runtime/runtime",
        "@fortawesome/fontawesome-free/js/fontawesome",
        "@fortawesome/fontawesome-free/js/solid",
        "@fortawesome/fontawesome-free/js/regular",
        path.join(SRC_ROOT, "client/index.jsx"),
      ],
    },
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
  },
  {
    devtool: "inline-source-map",
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
