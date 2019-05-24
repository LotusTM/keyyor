/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import { Vue, Component } from 'vue-property-decorator'
import { SITE } from '@data'

@Component
export default class Layout extends Vue {
  render () {
    return (
      <div class='Layout'>

        <header class='Layout__header'>
          <div class='h-flex h-flex-x--between h-flex-y--center h-childs-displace-- h-1/1'>

            <router-link to='/' class='g-link--inherit h-text+' style='background-image: none !important;'>
              <img src={SITE.logo} role='presentation' class='h-align--middle Icon--left' style='height: 2em;' />
              <span class='h-align--middle'>{SITE.name}</span>
            </router-link>

            <nav class='o-nav'>
              <router-link class='Nav-item' to='/' exact>Главеная</router-link>
              <router-link class='Nav-item' to='/offices'>Другая</router-link>
            </nav>

            <div class='o-nav h-flex-y--center h-text-'>
              Side
            </div>

          </div>
        </header>

        <main class='Layout__content'>
          {this.$slots.default}
        </main>

      </div>
    )
  }
}
