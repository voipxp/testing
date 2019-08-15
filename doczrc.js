import { css } from 'docz-plugin-css'
import path from 'path'

export default {
  title: 'Odin UI',
  src: './src',
  files: '**/*.mdx',
  dest: './docs',
  codeSandbox: false,
  wrapper: 'components/ui/doc-wrapper',
  plugins: [
    css({
      preprocessor: 'sass',
      cssmodules: false
    })
  ],
  modifyBundlerConfig: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
  filterComponents: files => {
    return files.filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath))
  }
}
