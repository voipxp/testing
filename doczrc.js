const path = require('path')

export default {
  title: 'Odin UI',
  files: 'src/**/*.mdx',
  codeSandbox: false,
  modifyBundlerConfig: config => {
    config.resolve.alias['src'] = path.join(__dirname, './src')
    config.entry.app.push('src/index.scss')
    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    })
    return config
  }
}
