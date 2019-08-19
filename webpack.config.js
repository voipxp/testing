const dotenv = require('dotenv')
dotenv.config()
const https = require('https')
const http = require('http')
const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const production = process.env.NODE_ENV === 'production'
const showStats = process.env.SHOW_STATS
const isHttps = process.env.API_URL && process.env.API_URL.startsWith('https')

module.exports = {
  devServer: {
    allowedHosts: ['.local', '.ngrok.io'],
    port: process.env.PORT,
    proxy: {
      '/api': {
        target: process.env.API_URL,
        changeOrigin: isHttps,
        agent: isHttps ? https.globalAgent : http.globalAgent
      },
      '/socket.io': {
        target: process.env.EVENT_URL || process.env.API_URL,
        ws: true,
        onError(err) {
          console.log('Suppressing WDS proxy upgrade error:', err)
        }
      },
      '/graphql': {
        target: process.env.GRAPHQL_URL,
        changeOrigin: isHttps,
        agent: isHttps ? https.globalAgent : http.globalAgent
      }
    }
  },
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: production ? '[name].[contenthash].js' : '[name].[hash].js'
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react-dom': '@hot-loader/react-dom',
      'chart.js': 'chart.js/dist/Chart.js'
    }
  },
  stats: showStats ? 'normal' : 'minimal',
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserJSPlugin({ sourceMap: true, parallel: true }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CopyPlugin([{ from: 'assets' }]),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === 'development' }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader'
      },
      {
        test: /.(html)$/,
        use: ['raw-loader']
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  }
}
