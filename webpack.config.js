const path = require("path");

module.exports = {
  entry: "./client/src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client/dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "client/dist")
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        "file-loader", {
          loader: "image-webpack-loader",
          options: {
            bypassOnDebug: true,
          },
        },
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 8192
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        "file-loader"
      ]
    }, {
      test: /\.(csv|tsv)$/,
      use: [
        "csv-loader"
      ]
    }, {
      test: /\.xml$/,
      use: [
        "xml-loader"
      ]
    }]
  }
};