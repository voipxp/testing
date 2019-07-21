module.exports = function(api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    ['@babel/preset-react']
  ]

  const plugins = [
    'react-hot-loader/babel',
    'babel-plugin-styled-components',
    'graphql-tag'
  ]

  return { presets, plugins }
}
