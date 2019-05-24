/* eslint-env serviceworker */

// Looks if URL is already open and focuses if it is, otherwise opens new window
const tryFocusWindow = (url) => clients.matchAll({ type: 'window' })
  .then((windows) => {
    const openWindow = windows.find((w) => w.url.endsWith(url))
    openWindow ? openWindow.focus() : clients.openWindow(url)
  })

export default () => {
  self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    const { action, notification } = event
    const { orderId } = notification.data || {}

    switch (action) {
      case 'openOrder':
        return event.waitUntil(tryFocusWindow(`/orders/${orderId}`))

      case 'openOrders':
        return event.waitUntil(tryFocusWindow(`/orders`))

      case 'openTasks':
      default:
        return event.waitUntil(tryFocusWindow(`/`))
    }
  })
}
