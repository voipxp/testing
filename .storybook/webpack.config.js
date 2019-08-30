const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = async ({ config, mode }) => {
  config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }))
  config.resolve.alias = { '@': path.resolve(__dirname, '../src') }
  // config.resolve.mainFields = ['browser', 'main', 'module']
  config.module.rules.push(
    // {
    //   test: /.(js|jsx)$/,
    //   exclude: /node_modules/,
    //   use: { loader: 'babel-loader' },
    //   include: path.resolve(__dirname, '../src')
    // },
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { hmr: process.env.NODE_ENV === 'development' }
        },
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../src')
    },
    {
      test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'file-loader',
      include: path.resolve(__dirname, '../src')
    }
  )
  return config
}
