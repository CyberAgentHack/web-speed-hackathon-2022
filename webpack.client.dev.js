/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");

const common = require("./webpack.client.common.js");

module.exports = merge(common, {
  devtool: "eval-source-map",
  mode: "development",
});
