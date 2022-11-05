/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");

const common = require("./webpack.client.common.js");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});
