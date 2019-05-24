const sass = require('node-sass')
const { functions } = require('../modules/sass-extensions')

module.exports = function () {
  // Sass
  // https://github.com/sindresorhus/grunt-sass
  // Compiles Sass with node-sass

  const data = this.config.process(this.config('data')())

  this.config('sass', {
    build: {
      options: {
        implementation: sass,
        outputStyle: 'nested',
        sourceMap: true,
        functions: functions(data)
      },
      files: [{
        expand: true,
        cwd: '<%= path.source.styles %>',
        src: ['*.scss'],
        dest: '<%= path.build.styles %>',
        ext: '.compiled.css'
      }]
    }
  })

  // PostCSS
  // https://github.com/nDmitry/grunt-postcss
  // Apply several post-processors to your CSS using PostCSS

  this.config('postcss', {
    autoprefix: {
      options: {
        processors: [
          require('autoprefixer')
        ],
        map: true
      },
      files: [{
        expand: true,
        cwd: '<%= path.build.styles %>',
        src: '{,**/}*.compiled.css',
        dest: '<%= path.build.styles %>',
        ext: '.prefixed.css'
      }]
    }
  })

  // // Uncss
  // // https://github.com/addyosmani/grunt-uncss
  // // Remove unused CSS

  // this.config('uncss', {
  //   build: {
  //     options: {
  //       htmlroot: '<%= path.build.root %>',
  //       ignore: [
  //         // Classes inside IE conditional blocks have to be ignored explicitly
  //         // See https://github.com/giakki/uncss/issues/112
  //         '.Outdated-browser',
  //         '.Outdated-browser__link',

  //         // @todo https://github.com/tmpvar/jsdom/issues/1750
  //         'svg:not(:root)',

  //         // @todo https://github.com/giakki/uncss/pull/280#issuecomment-320507763
  //         '::placeholder',

  //         // This class usually not occurs in original templates, but you might want
  //         // to use it occasionally on production
  //         '.o-show-grid',

  //         // Ignore state-related classes, like `is-active` and `menu-entry--is-active`
  //         /[-.#](is|has|not)-/
  //       ],
  //       ignoreSheets: [
  //         // Ignoring all remote CSS to avoid pulling into main styles unexpected CSS.
  //         // It is recommended to whitelist needed external CSS explicitly instead.
  //         /^(http(s)?|\/\/).*/
  //       ]
  //     },
  //     files: [{
  //       src: '<%= path.build.root %>/{,**/}*.html',
  //       dest: '<%= path.build.styles %>/style.tidy.css'
  //     }]
  //   }
  // })

  // CSSO
  // https://github.com/t32k/grunt-csso
  // Minify CSS files with CSSO

  this.config('csso', {
    build: {
      options: {
        report: 'min',
        sourceMap: true
      },
      files: [{
        expand: true,
        cwd: '<%= path.build.styles %>',
        src: '{,**/}*.{tidy,min,prefixed}.css',
        dest: '<%= path.build.styles %>',
        ext: '.min.css'
      }]
    }
  })

  // Clean
  // https://github.com/gruntjs/grunt-contrib-clean
  // Clean folders to start fresh

  this.config.merge({
    clean: {
      styles: {
        files: [{
          expand: true,
          cwd: '<%= path.build.styles %>',
          src: ['{,**/}!(*.min.css|*.min.css.map)']
        }
        ]
      }
    } })

  // Watch
  // https://github.com/gruntjs/grunt-contrib-watch
  // Watches scss, js etc for changes and compiles them

  this.config.merge({
    watch: {
      styles: {
        files: [
          '<%= path.source.root %>/{,**/}*.scss',
          '<%= path.temp.root %>/{,**/}*.scss'
        ],
        tasks: [
          'sass',
          'postcss:autoprefix'
        ]
      }
    }
  })
}
