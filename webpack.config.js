/**
 * Created by glenn on 29/02/16.
 */

const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool  : 'eval',
  resolve  : {
    root      : [
      path.join(__dirname, 'src'),
    ],
    alias     : {
      //'kendo-ui-core-css': 'kendo-ui-core/dist/styles/web',
      //'kendo-ui-core-js' : 'kendo-ui-core/src',
      'kendo-ui-core-css': './src/vendor/telerik.kendoui.2016.1.226.core/src/styles/web',
      'kendo-ui-core-js' : './src/vendor/telerik.kendoui.2016.1.226.core/src/js',
    },
    extensions: ['', '.js', '.css', '.html', '.json'],
  },
  entry    : {
    vendor: [
      'bootstrap-loader',
      'font-awesome-loader!./font-awesome.config.js',
      'lodash',
      'jquery',
      'kendo-ui-core-css/kendo.common-bootstrap.core',
      'kendo-ui-core-css/kendo.bootstrap',
      //'kendo-ui-core-js/kendo.window',
      'kendo-ui-core-js/kendo.ui.core',
      'react',
      'react-dom',
      'react-router',
    ],
    app   : [
      'babel-polyfill',
      './src/main.js',
    ],
  },
  output   : {
    path      : path.join(__dirname, 'dist'),
    filename  : '[name].js',
    publicPath: '/',
  },
  plugins  : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon : './src/favicon.ico',
    }),

    new ExtractTextPlugin('[name].css'),

    new webpack.ProvidePlugin({
      'window.Tether': 'tether',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module   : {
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
          plugins: ['transform-runtime'],
        },
      },
      {
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
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test  : /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loader: 'url',
      },
      {
        test  : /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file',
      },
      {
        test  : /\.(png|gif|jpg)$/,
        loader: 'url?limit=8192',
      },
      {
        test   : /\.html$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader : 'html',
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
  devServer: {
    noInfo            : true,
    historyApiFallback: true,
    port              : 3000,
  },
};
