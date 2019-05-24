/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import { RouteConfig } from 'vue-router'
import Home from './Home'
import NotFound from './404'

export enum LayoutType {
  'BLEED' = 'BLEED'
}

export interface RouteMeta {
  readonly layoutType?: LayoutType
  readonly className?: string
}

interface MetedRouteConfig extends RouteConfig {
  meta?: RouteMeta
}

const routes: MetedRouteConfig[] = [
  { path: '/', component: Home },
  // @todo Note that it will not return 404 status code
  { path: '/404', component: NotFound, meta: { layoutType: LayoutType.BLEED } },
  { path: '*', component: NotFound, meta: { layoutType: LayoutType.BLEED } }
]

export default routes
