const path = require('path')
const common = require('./webpack.config.common')
const webpack = require('webpack')

module.exports = (env = {}) => {
  const commonConfig = common(env)

  return Object.assign({}, commonConfig, {
    name: 'main',
    entry: './source/scripts/main.ts',
    output: {
      path: path.resolve(__dirname, 'build/assets/scripts'),
      filename: '[name].js',
      publicPath: '/assets/scripts/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          externals: {
            test: /[\\/]node_modules[\\/]/,
            name: 'externals',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      ...commonConfig.plugins,
      // Prevent Moment from loading all locales
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  })
}
