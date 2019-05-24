const path = require('path')
const common = require('./webpack.config.common')

module.exports = (env = {}) => Object.assign({}, common(env), {
  name: 'serviceWorker',
  entry: './source/scripts/serviceWorker/sw.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'sw.js'
  }
})
