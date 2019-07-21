export default {
  title: 'Odin UI',
  src: './src',
  files: '**/*.mdx',
  plugins: ['gatsby-plugin-sass'],
  filterComponents: files => {
    return files.filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath))
  }
}
