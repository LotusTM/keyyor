const { join } = require('path')
const traverse = require('../../modules/traverse')
const urljoin = require('../../modules/urljoin')
const pkg = require('../../package.json')

const companyName = '2BAD'
const appName = 'Keyyor'
const appInternalName = 'keyyor'
const appDescription = 'Сервис для работы с ключевыми словами Keyyor'
const appShortName = 'Keyyor'
const minWidth = 1100

module.exports = ({ config }) => {
  const { env, path, file, locales, baseLocale } = config()
  const cwd = process.cwd()
  const stripBuildpath = (data) => traverse(data, (p) => p.replace(path.build.root + '/', ''))

  const PATH = Object.assign(path, stripBuildpath(path.build), {
    file: stripBuildpath(file.build)
  })

  const data = {
    PATH,
    SITE: {
      name: appName,
      shortName: appShortName,
      version: pkg.version,
      description: appDescription,
      homepage: env.sitename ? `https://${env.sitename}` : pkg.homepage,
      logo: urljoin('/', PATH.images, '/logo.svg'),
      rastrLogo: urljoin('/', PATH.images, '/logo.png'),
      // `maximum-scale=1` prevent iOS Safari from zooming on focusing inputs,
      // but it doesn't prevent zooming alltogether
      viewport: `width=${minWidth}, initial-scale=1`,
      minWidth,
      themeColor: '#8f88f7',
      locales,
      baseLocale,
      matter: () => require(join(cwd, file.temp.data.matter)),
      images: () => require(join(cwd, file.temp.data.images)),
      googleAnalyticsId: 'UA-121967964-1', // 'UA-XXXXX-X'
      yandexMetrikaId: '49513564', // 'XXXXXX'
      sentryUrl: 'https://6db8d9af609c4e7aa6eeb88f274500f5@sentry.io/1219979'
    },
    PLACEHOLDERS: {
      appName,
      appInternalName,
      appDescription,
      companyName
    },
    PAGE_DEFAULTS: {
      image: '',
      class: '',
      bodyClass: ''
    },
    SOCIAL: { // Add any other social services following same pattern
      twitter: {
        // handle: '@LotusTM',
        image: urljoin('/', PATH.images, '/twitter.png')
        // url: 'https://twitter.com/@LotusTM'
      },
      facebook: {
        image: urljoin('/', PATH.images, '/facebook.png')
        // url: 'https://www.facebook.com/Lotus-TM-647393298791066/'
      }
    },
    ENV: {
      production: env.production,
      staging: env.staging,
      build: env.build,
      buildSHA1: env.buildSHA1,
      buildNumber: env.buildNumber,
      hotModuleRloading: env.hotModuleRloading
    }
  }

  return function (locale) {
    switch (locale) {
      default: return data
    }
  }
}
