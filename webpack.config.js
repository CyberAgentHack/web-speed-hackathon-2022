/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const webpack = require("webpack")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
          exclude: [/\/esm\//, /node_modules/, /other/],
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    bugfixes: true,
                    corejs: 3,
                    useBuiltIns: "usage",
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
      // filename: '[name]-[contenthash:8].js',
      path: DIST_PUBLIC
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),

      // new BundleAnalyzerPlugin(),

      new MomentTimezoneDataPlugin({ matchCountries: 'JP' }),

      new webpack.IgnorePlugin({
        contextRegExp: /moment$/,
        resourceRegExp: /^\.\/locale$/,
      }),

      new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(SRC_ROOT, "./index.html")
      })

    ],
    resolve: {
      alias: {
        "react": "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react/jsx-runtime": "preact/jsx-runtime"
      },
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "production",
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
      minimize: false
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
