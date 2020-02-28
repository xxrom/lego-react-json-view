const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: "./dist",
    port: "3000"
  },
  devtool: "inline-source-map",
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(j|t)sx?$/,
      //   exclude: /(node_modules)/,
      //   include: /src/,
      //   use: ["astroturf/loader", "awesome-typescript-loader"]
      // },
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
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
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
