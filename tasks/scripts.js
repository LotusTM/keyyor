const webpackConfig = require('../webpack.config.js')
const webpackServiceWorkerConfig = require('../webpack.config.sw.js')

module.exports = function () {
  // Webpack
  // https://github.com/webpack-contrib/grunt-webpack
  // Use Webpack with Grunt.

  this.config('webpack', {
    watch: Object.assign({}, webpackConfig({ production: this.config('env.build') }), {
      watch: true,
      keepalive: false
    }),
    build: webpackConfig({ production: this.config('env.build') }),
    watchServiceWorker: Object.assign({}, webpackServiceWorkerConfig({ production: this.config('env.build') }), {
      watch: true,
      keepalive: false
    }),
    buildServiceWorker: webpackServiceWorkerConfig({ production: this.config('env.build') })
  })
}
