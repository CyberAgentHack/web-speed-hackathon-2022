/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");

const common = require("./webpack.client.config.js");

module.exports = merge(common, {
  mode: "production",
});
