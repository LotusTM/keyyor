/* eslint-env serviceworker */
/* global fetch:false */

import filesData from '@files'

const CACHE = 'v1'

const update = (request, response) =>
  caches.open(CACHE)
    .then((cache) => cache.put(request.clone(), response.clone()))
    .then(() => response)

// Implements Network-first strategy:
// If Network is available, will try to retrieve directly from network
// If there is no Network, will try to get resource from cache
export default () => {
  const files = filesData.map((f) => `./${f.location}`)

  self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open(CACHE).then((cache) => cache.addAll(files))
    )
  })

  self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((cache) => {
          if (cache !== CACHE) return caches.delete(cache)
        })))
    )
  })

  self.addEventListener('fetch', (e) => {
    if (
      e.request.method !== 'GET' ||
      !e.request.url.startsWith('http') ||
      e.request.url.includes('browser-sync/socket.io') ||
      e.request.url.includes('mc.yandex.ru') ||
      e.request.url.includes('google-analytics.com')
    ) return

    e.respondWith(
      fetch(e.request.clone())
        .then((response) => update(e.request, response))
        .catch(() => {
          console.log(`[sw.js] failed to fetch ${e.request.url}, trying cache`)
          return caches.match(e.request)
        })
    )
  })
}
