module.exports = function(api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: '3.0' }],
    '@babel/preset-react'
  ]

  const plugins = [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-styled-components', { ssr: false }]
  ]

  return { presets, plugins }
}
