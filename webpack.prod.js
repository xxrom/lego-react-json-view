const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.prod.tsx"],
  devtool: "source-map",
  target: "web",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist-webpack"),
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    alias: {
      "@common": path.join(__dirname, "./src/common"),
      "@settings": path.join(__dirname, "./src/settings"),
      "@colors": path.join(__dirname, "./src/colors")
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: ["babel-loader", "astroturf/loader"]
      },

      {
        test: /\.css$/,
        use: ["style-loader", "astroturf/css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  externals: {
    react: "commonjs2 react",
    "react-dom": "commonjs2 react-dom"
  }
};
