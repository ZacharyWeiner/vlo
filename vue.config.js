const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: false,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
});
