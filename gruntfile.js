const timeGrunt = require('time-grunt')
const gruntWriteJson = require('./modules/grunt-write-json')
const jitGrunt = require('jit-grunt')
const gettext = require('./modules/gettext')

module.exports = function (grunt) {
  'use strict'

  // Track execution time
  timeGrunt(grunt)

  gruntWriteJson(grunt)

  // Load grunt tasks automatically
  jitGrunt(grunt, {
    nunjucks: 'grunt-nunjucks-2-html',
    sprite: 'grunt-spritesmith',
    'webpack-dev-server': 'grunt-webpack'
  })

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Specify environment variables
    env: {
      sitename: process.env.SITENAME || false,
      production: (process.env.PRODUCTION === 'true') || grunt.option('production') || false,
      staging: (process.env.STAGING === 'true') || grunt.option('staging') || false,
      build: grunt.cli.tasks.includes('build') || false,
      buildSHA1: process.env.CIRCLE_SHA1 || false,
      buildNumber: process.env.CIRCLE_BUILD_NUM || false,
      // @todo Right now due to migration to the Webpack it does nothing,
      //       but should in future
      hotModuleRloading: grunt.option('hmr'),
      tinypng: {
        api: {
          key: process.env.TINYPNG_API_KEY
        }
      },
      github: {
        api: {
          key: process.env.GITHUB_API_KEY
        }
      }
    },

    // Specify your source and build directory structure
    path: {
      tasks: {
        root: 'tasks'
      },

      source: {
        root: 'source',
        data: '<%= path.source.root %>/data',
        fonts: '<%= path.source.root %>/fonts',
        icons: '<%= path.source.root %>/icons',
        images: '<%= path.source.root %>/images',
        locales: '<%= path.source.root %>/locales',
        scripts: '<%= path.source.root %>/scripts',
        sprites: '<%= path.source.root %>/sprites',
        static: '<%= path.source.root %>/static',
        styles: '<%= path.source.root %>/styles',
        templates: '<%= path.source.root %>/templates'
      },

      temp: {
        root: 'temp',
        data: '<%= path.temp.root %>/data',
        styles: '<%= path.temp.root %>/styles'
      },

      build: {
        root: 'build',
        assets: '<%= path.build.root %>/assets',
        fonts: '<%= path.build.assets %>/fonts',
        images: '<%= path.build.assets %>/images',
        scripts: '<%= path.build.assets %>/scripts',
        sprites: '<%= path.build.assets %>/sprites',
        static: '<%= path.build.root %>',
        styles: '<%= path.build.assets %>/styles',
        templates: '<%= path.build.root %>'
      }
    },

    // Specify files
    file: {
      source: {
        data: {
          scripts: '<%= path.source.data %>/scripts.js'
        }
      },

      temp: {
        data: {
          matter: '<%= path.temp.data %>/matter.json',
          images: '<%= path.temp.data %>/images.json'
        }
      },

      build: {
        script: {
          runtime: '<%= path.build.scripts %>/runtime.js',
          main: '<%= path.build.scripts %>/main.js',
          externals: '<%= path.build.scripts %>/externals.js'
        },
        serviceWorker: {
          sw: '<%= path.build.root %>/sw.js'
        },
        sprite: {
          compiled: '<%= path.build.sprites %>/sprite.png'
        }
      }
    },

    locales: {
      'ru-RU': {
        locale: 'ru-RU',
        url: '/',
        rtl: false,
        defaultForLanguage: true,
        numberFormat: '0,0.[00]',
        currencyFormat: '0,0.00 $'
      }
    },
    baseLocale: 'ru-RU'
  })

  grunt.config.merge({
    gettext: gettext(grunt.config('path.source.locales')),
    data: require(`./${grunt.config('path.source.data')}`)(grunt)
  })

  grunt.loadTasks(grunt.config('path.tasks.root'))

  // Build for development and serve
  grunt.registerTask('default', [
    'clean:build',
    'writeJSON',
    'copy',
    'responsive_images:thumbnails',
    'image_size',
    'grayMatter',
    'nunjucks',
    // 'sprite',
    // 'webfont',
    'sass',
    'postcss:autoprefix',
    'webpack-dev-server:watch',
    'folder_list',
    'webpack:watchServiceWorker',
    'watch'
  ])

  // Build for production
  grunt.registerTask('build', [
    'clean',
    'writeJSON',
    'copy',
    'responsive_images:thumbnails',
    'image_size',
    'grayMatter',
    'nunjucks',
    // 'sprite',
    // 'webfont',
    'sass',
    'postcss:autoprefix',
    'webpack:build',
    // 'uncss',
    'csso',
    'htmlmin',
    // 'tinypng',
    'clean:styles',
    'cacheBust',
    'sitemap_xml',
    'folder_list',
    'webpack:buildServiceWorker',
    'size_report'
  ])

  // Serve built version
  grunt.registerTask('serve', [
    'webpack-dev-server:watch',
    'webpack:watchServiceWorker',
    'watch'
  ])

  return grunt
}
