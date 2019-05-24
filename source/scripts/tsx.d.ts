/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
