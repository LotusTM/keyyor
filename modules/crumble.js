const _ = require('lodash')
const { extname } = require('path')

/**
 * Explodes string path into array breadcrumb
 * @param  {string} to Relative or absolute path
 * @return {array}     Array, which consists of path's fragments
 * @example crumble('/url/to/index.html') -> `['url', 'to']`
 * @example crumble('/url/to/404.html') -> `['url', 'to', '404']`
 * @example crumble('/') -> `['index']`
*/
module.exports = (to) => {
  if (to === '/') return ['index']

  const breadcrumb = _.chain(to)
    .trimStart('/')
    .trimEnd('/')
    .replace(new RegExp(`${extname(to)}$`, 'ig'), '')
    .split('/')
    .value()

  if ((breadcrumb.length >= 2) && (_.last(breadcrumb) === 'index')) {
    breadcrumb.pop()
  }

  return breadcrumb
}
