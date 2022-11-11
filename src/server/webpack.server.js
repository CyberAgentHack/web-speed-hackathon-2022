/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

const nodeExternals = require("webpack-node-externals");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

module.exports = {
  devtool: "inline-source-map",
  entry: path.join(SRC_ROOT, "./index.js"),
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(abs("../../node_modules/")),
    }),
  ],
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
    filename: "main.js",
    path: DIST_ROOT,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".jsx"],
  },
  target: "node",
};
