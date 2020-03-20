const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = require("./webpack.common");

module.exports = {
  resolve,
  devServer: {
    contentBase: "./dist",
    port: "8000"
  },
  devtool: "inline-source-map",
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: true
            }
          },
          "astroturf/loader",
          "react-hot-loader/webpack"
        ]
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
    })
  ]
};
