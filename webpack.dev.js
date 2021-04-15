const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/client/views/index.html",
      filename: "index.html",
    })
  ]
}
