/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BleedLayout extends Vue {
  render () {
    return (
      <main class='Bleed-layout'>
        <div class='Bleed-layout__content'>
          {this.$slots.default}
        </div>
      </main>
    )
  }
}
