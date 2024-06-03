const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') // 访问内置的插件
const path = require('path')

module.exports = {
  output: {
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'

    })
  ]
}
