const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  const srcPath = path.resolve(__dirname, '..', 'src')
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /.(css|scss|sass)$/,
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      alias: {
        '@': srcPath
      }
    }
  })
}
