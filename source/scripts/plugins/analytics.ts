/* eslint no-unused-vars: "off" */
/* eslint @typescript-eslint/no-unused-vars: "error" */

import data from '@data'

const GA_TRACKING_ID = data.SITE.googleAnalyticsId
const YA_COUNTER_ID = data.SITE.yandexMetrikaId

const gtagHelper = (...args: Readonly<[any, string, any?]>) => {
  if (!GA_TRACKING_ID || typeof gtag !== 'function') return

  try {
    gtag(...args)
  } catch (error) {
    console.error(error)
  }
}

const yaCounter = (method: string, ...args: ReadonlyArray<any>) => {
  const counter = (window as any)[`yaCounter${YA_COUNTER_ID}`]
  if (!YA_COUNTER_ID || !counter) return

  try {
    counter[method](...args)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Tell Analytics about URL change
 * @param {string} page_path New page path
 * @return void
 * @example
 *   setAnalyticsPage('/my-page')
 */
export const setAnalyticsPage = (page_path: string) => { // eslint-disable-line camelcase
  // @todo We can send `page_title` here too
  gtagHelper('config', GA_TRACKING_ID, { page_path })
  // @todo We can send `title` here too
  yaCounter('hit', page_path)
}
