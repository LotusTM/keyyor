const path = require('path')
const webpack = require('webpack')

// @todo We should use already defined in Grun paths heres

module.exports = (env = {}) => {
  const isProduction = env.production // --env.production
  const babelOptions = { cacheDirectory: true }

  return {
    target: 'web',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: babelOptions
          }, {
            loader: 'ts-loader'
          }]
        }, {
          test: /\.m?jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelOptions
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@data': path.resolve(__dirname, 'temp/data/scripts.js'),
        '@files': path.resolve(__dirname, 'temp/data/files.json')
      }
    },
    plugins: [
      isProduction
        ? new webpack.HashedModuleIdsPlugin()
        : new webpack.NamedModulesPlugin()
    ]
  }
}
