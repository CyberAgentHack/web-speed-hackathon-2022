/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// const zlib = require("zlib");

const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
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
    devtool: "source-map",
    entry: {
      app: path.join(SRC_ROOT, "client/foundation/App.jsx"),
      main: path.join(SRC_ROOT, "client/index.jsx"),
    },
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
          exclude: /(\/esm\/|node_modules|original)/,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              // compact: false,
              plugins: ["@babel/plugin-syntax-dynamic-import"],
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
    name: "client",
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          extractComments: "all",
          terserOptions: {
            compress: { drop_console: true },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            enforce: true,
            name: "vendor",
          },
        },
      },
    },
    output: {
      filename: "[name].js",
      path: DIST_PUBLIC,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      new MomentLocalesPlugin({ localesToKeep: ["ja"] }),
      new CompressionPlugin({
        // algorithm: "brotliCompress",
        compressionOptions: {
          // params: {
          //   [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          // },
          level: 9,
        },
        filename: "[path][base].br",
        minRatio: 1,
        test: /\.(js|css|html|svg)$/,
        threshold: 860,
      }),
      // new BundleAnalyzerPlugin(),
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
