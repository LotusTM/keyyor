const data = require('./index')

/**
 * Data to be compiled to a JSON file `scripts.json` by a Grunt task
 * Later this data can be imported in `source/scripts` via
 * `import data from '@data'`
 * Try to keep footprint of this file as small as possible
 * to avoid bloating built frontend `main.js` file.
 * @param {function} grunt Grunt instance
 * @return {object} Data for frontend scripts
 */
module.exports = (grunt) => {
  const {
    PATH,
    SITE: {
      name,
      version,
      homepage,
      logo,
      rastrLogo,
      locales,
      baseLocale,
      sentryUrl,
      googleAnalyticsId,
      yandexMetrikaId
    },
    PLACEHOLDERS: {
      appInternalName
    },
    ENV: {
      build,
      buildSHA1,
      buildNumber,
      staging,
      production
    }
  } = data(grunt)()

  return {
    PATH,
    SITE: {
      name,
      version,
      homepage,
      logo,
      rastrLogo,
      locales,
      baseLocale,
      sentryUrl,
      googleAnalyticsId,
      yandexMetrikaId
    },
    PLACEHOLDERS: {
      appInternalName
    },
    ENV: {
      build,
      buildSHA1,
      buildNumber,
      staging,
      production
    }
  }
}
