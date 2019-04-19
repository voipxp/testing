import { css } from 'docz-plugin-css'

export default {
  title: 'Odin UI',
  files: 'src/**/*.mdx',
  codeSandbox: false,
  plugins: [
    css({
      preprocessor: 'sass',
      cssmodules: false
    })
  ]
}
