/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

export default {
  state: {
    some: false
  },

  getters: {
    some: (state) => state.some
  },

  mutations: {
    SET_IS_INITED: (state, isInited) => { state.isInited = isInited }
  },

  actions: {
    getData: () => Promise.resolve()
  }
}
