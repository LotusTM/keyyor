/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import { SITE, ENV } from '@data'

export const SHA1 = ENV.buildSHA1
export const build = ENV.buildNumber ? `${ENV.buildNumber}.${SHA1}` : 'local'
export const version = SITE.version
export const release = `${version}+${build}`
export const environment = ENV.production ? 'production' : 'development'
export const staging = ENV.staging ? '(staging)' : ''

export default () => {
  console.log(`${SITE.name} v${release}, ${environment} ${staging}`)
}
