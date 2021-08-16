const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  }
};
