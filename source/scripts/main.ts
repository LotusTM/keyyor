import 'reflect-metadata'
import Vue from 'vue'
import siteInfo from './plugins/siteInfo'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/store'
import registerServiceWorker from './serviceWorker/register'
import { setAnalyticsPage } from './plugins/analytics'
import './utils/dom-polyfills'

import App from './App'

siteInfo()

const html = document.querySelector('html')
if (html) html.classList.remove('no-js')

registerServiceWorker()

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  mode: 'history',

  scrollBehavior ({ hash }, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (hash) return { selector: hash }
    return { x: 0, y: 0 }
  }
})

router.afterEach((to) => setAnalyticsPage(to.path))

const app = new Vue({
  router,
  store,
  render: (h) => h(App, {
    props: { id: 'app' }
  })
})

app.$mount('#app')

export default app
