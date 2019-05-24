/* eslint-env jest */

import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routes from './routes'

import App from './App'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('App component', () => {
  it('should render', () => {
    const router = new VueRouter({ routes })
    const { element } = mount(App, {
      localVue,
      router,
      stubs: {
        'router-link': RouterLinkStub
      }
    })

    expect(element).toBeDefined()
  })
})
