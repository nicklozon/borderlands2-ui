const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".sass", ".scss"]
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [{
          loader: "ts-loader"
      }]
    },{
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    },{
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      },{
        loader: "css-loader"
      }]
    },{
      test: /\.woff2?$/,
      use: [{
        loader: "url-loader?limit=100000"
      }]
    },{
      test: /\.(scss|sass)$/,
      use:[{
        loader: "style-loader"
      },{
        loader: "css-modules-typescript-loader"
      },{
        loader: "css-loader",
        options: {
          modules: true
        }
      },{
        loader: "sass-loader"
      }]
    },{
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: "file-loader"
      }]
    }]
  },
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
