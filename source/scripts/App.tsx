/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import { Vue, Component } from 'vue-property-decorator'
import { RouteMeta, LayoutType } from './routes'

import Layout from './components/Layout'
import BleedLayout from './components/BleedLayout'

@Component({
  components: {
    Layout,
    BleedLayout
  }
})
export default class App extends Vue {
  render () {
    const { layoutType, className }: RouteMeta = this.$route.meta || {}

    const ResolvedLayout = () => {
      switch (layoutType) {
        case LayoutType.BLEED: return <bleed-layout class={className}><router-view /></bleed-layout>
        default: return <layout class={className}><router-view /></layout>
      }
    }

    // <transition name='App' appear>
    // </transition>
    return <ResolvedLayout />
  }
}
