/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import Vue from 'vue'
import Vuex from 'vuex'

import { ENV } from '@data'
import misc from './misc'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: !ENV.build,
  modules: {
    misc
  }
})
