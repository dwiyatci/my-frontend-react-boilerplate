/**
 * Created by glenn on 29/02/16.
 */

const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  resolve: {
    root      : [
      path.join(__dirname, 'src'),
    ],
    alias     : {
      'bootstrap-css'    : 'bootstrap/dist/css',
      'bootstrap-js'     : 'bootstrap/dist/js/umd',
      //'kendo-ui-core-css': 'kendo-ui-core/dist/styles/web',
      //'kendo-ui-core-js' : 'kendo-ui-core/src',
      'kendo-ui-core-css': './src/vendor/telerik.kendoui.2016.1.226.core/src/styles/web',
      'kendo-ui-core-js' : './src/vendor/telerik.kendoui.2016.1.226.core/src/js',
    },
    extensions: ['', '.js', '.css', '.html', '.json'],
  },
  entry  : {
    vendor: [
      'lodash',
      'jquery',
      'font-awesome-webpack',
      'bootstrap-css/bootstrap.min',
      'kendo-ui-core-css/kendo.common-bootstrap.core',
      'kendo-ui-core-css/kendo.bootstrap',
      //'kendo-ui-core-js/kendo.window',
      'kendo-ui-core-js/kendo.ui.core',
    ],
    app   : ['./src/main.js'],
  },
  output : {
    path      : path.join(__dirname, 'dist'),
    filename  : '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon : './src/favicon.ico',
    }),

    new ExtractTextPlugin('[name].css'),
  ],
  module : {
    loaders: [
      {
        test   : /\.js$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        exclude: [
          path.join(__dirname, 'src/vendor'),
        ],
        loader : 'babel',
        query  : {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test   : /\.js$/,
        include: [
          path.join(__dirname, 'node_modules/bootstrap/dist/js/umd'),
          //path.join(__dirname, 'node_modules/kendo-ui-core/src'),
          path.join(__dirname, 'src/vendor/telerik.kendoui.2016.1.226.core/src/js'),
        ],
        loader : 'imports?jQuery=jquery',
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test   : /\.html$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader : 'html',
      },
      {
        test  : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff',
      },
      {
        test  : /.(png|jpg|gif)$/,
        loader: 'url?limit=8192',
      },
      {
        test  : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
      {
        test   : /\.json$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader : 'json',
      },
    ],
  },
};
