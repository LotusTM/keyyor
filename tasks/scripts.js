const webpackConfig = require('../webpack.config.js')
const webpackServiceWorkerConfig = require('../webpack.config.sw.js')

module.exports = function () {
  const resolvedWebpackConfig = webpackConfig({ production: this.config('env.build') })

  // Webpack
  // https://github.com/webpack-contrib/grunt-webpack
  // Use Webpack with Grunt.

  this.config('webpack-dev-server', {
    watch: Object.assign({}, {
      webpack: resolvedWebpackConfig
    },
    // @todo Because of https://github.com/webpack-contrib/grunt-webpack/issues/154
    resolvedWebpackConfig.devServer,
    {
      publicPath: resolvedWebpackConfig.output.publicPath,
      hot: this.config('env.hotModuleRloading'),
      open: true,
      keepalive: false
    })
  })

  this.config('webpack', {
    build: resolvedWebpackConfig,
    watchServiceWorker: Object.assign({}, webpackServiceWorkerConfig({ production: this.config('env.build') }), {
      watch: true,
      keepalive: false
    }),
    buildServiceWorker: webpackServiceWorkerConfig({ production: this.config('env.build') })
  })
}
