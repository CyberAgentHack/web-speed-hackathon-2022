/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const zlib = require("zlib");

const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("terser-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
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
    devtool: "inline-source-map",
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
          exclude: /\/esm\//,
          test: /\.jsx?$/,
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
        // {
        //   test: /\.css$/i,
        //   use: [
        //     { loader: MiniCssExtractPlugin.loader },
        //     { loader: "css-loader", options: { url: false } },
        //     { loader: "postcss-loader" },
        //   ],
        // },
      ],
    },
    name: "client",
    optimization: {
      minimize: true,
      minimizer: ["...", new CssMinimizerPlugin()],
    },
    output: {
      // filename: "scripts/[name]-[contenthash:8].js",
      path: DIST_PUBLIC,
      // publicPath: "/",
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      // new BundleAnalyzerPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: "styles/[name]-[contenthash:8].css",
      // }),
      // new HtmlWebpackPlugin({
      //   inject: true,
      //   template: path.resolve(SRC_ROOT, "client/index.html"),
      // }),
      new CompressionPlugin({
        algorithm: "brotliCompress",
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        filename: "[path][base].br",
        minRatio: 1,
        test: /\.(js|css|html|svg)$/,
        threshold: 860,
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      // fallback: {
      //   fs: false,
      //   path: false,
      // },
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
              // plugins: ["@babel/plugin-transform-runtime"],
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
    // optimization: {
    //   minimize: true,
    //   minimizer: ["...", new CssMinimizerPlugin()],
    // },
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    // plugins: [
    //   new CompressionPlugin({
    //     filename: "[path][base].br",
    //     algorithm: "brotliCompress",
    //     test: /\.(js|css|html|svg)$/,
    //     compressionOptions: {
    //       params: {
    //         [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //       },
    //     },
    //     threshold: 860,
    //     minRatio: 1,
    //   }),
    // ],
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
  },
];
