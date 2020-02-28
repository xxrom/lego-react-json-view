const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // dev
  devServer: {
    contentBase: "./dist"
  },
  // prod
  entry: [
    "react-hot-loader/patch", // make sure the HMR package is included
    "./src/index.tsx"
  ],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  resolve: {
    extensions: [".tsx", ".js"],
    alias: { "react-dom": "@hot-loader/react-dom" }
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: ["babel-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: [
          "ts-loader",
          {
            loader: "astroturf/loader",
            options: {
              extension: ".module.css",
              enableCssProp: true
            }
          }
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
      // favicon: './src/assets/icons/favicon.png',
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
