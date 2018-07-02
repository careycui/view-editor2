var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var plugins = [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new CleanWebpackPlugin(
      'http/',
      {
        root: path.resolve(__dirname, '../'),
        verbose: true,
        dry: false
      }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../client/static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ];
var pages = utils.getEntry(config.server.entry.html);

for (var pathname in pages) {

  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
    inject: true,              // js插入位置
    hash: true
  };

  plugins.push(new HtmlWebpackPlugin(conf));
}
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  mode: 'development',
  plugins: plugins
})