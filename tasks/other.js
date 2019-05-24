const history = require('connect-history-api-fallback')

module.exports = function () {
  // Generate sitemap
  // https://github.com/lotustm/grunt-sitemap-xml
  // Grunt plugin for generating XML sitemaps for search engine indexing

  this.config('sitemap_xml', {
    options: {
      trailingSlash: false
    },
    build: {
      files: [{
        cwd: '<%= path.build.root %>/',
        src: ['{,**/}*.html', '!{403,404,500,503}.html'],
        dest: '<%= path.build.root %>/sitemap.xml'
      }]
    }
  })

  // Cache Bust
  // https://github.com/hollandben/grunt-cache-bust
  // Bust static assets from the cache using content hashing

  const urlPrefixes = [this.config('data')().SITE.homepage]

  this.config.merge({
    cacheBust: {
      build: {
        options: {
          deleteOriginals: true,
          baseDir: '<%= path.build.root %>',
          assets: ['{,**/}*.{css,js}'],
          urlPrefixes
        },
        src: ['<%= path.build.root %>/{,**/}*.{html,css,js}']
      },
      images: {
        options: {
          queryString: true,
          baseDir: '<%= path.build.root %>',
          assets: ['{,**/}*.{jpg,jpeg,gif,png,svg}'],
          urlPrefixes
        },
        src: ['<%= path.build.root %>/{,**/}*.{html,css,js}']
      }
    } })

  // Clean
  // https://github.com/gruntjs/grunt-contrib-clean
  // Clean folders to start fresh

  this.config.merge({
    clean: {
      build: {
        files: {
          src: ['<%= path.build.root %>/*']
        }
      },
      temp: {
        files: {
          src: ['<%= path.temp.root %>/*']
        }
      }
    }
  })

  // grunt-folder-list
  // https://github.com/roughcoder/grunt-folder-list
  // Returns the file, folder or both structure from a given source in JSON or YML. Includes depth, file size and file type.

  this.config.merge({
    folder_list: {
      files: {
        options: {
          files: true,
          folders: false
        },
        files: [{
          cwd: '<%= path.build.root %>/',
          src: ['{,**/}*', '!{,**/}*.map'],
          dest: '<%= path.temp.data %>/files.json'
        }]
      }
    }
  })

  // Browser Sync
  // https://github.com/shakyshane/grunt-browser-sync
  // Keep multiple browsers & devices in sync

  this.config('browserSync', {
    debug: {
      options: {
        open: true,
        notify: false,
        watchTask: true,
        online: false,
        ghostMode: {
          clicks: true,
          links: true,
          forms: true,
          scroll: true
        },
        watchEvents: ['add', 'change'],
        reloadDebounce: 100,
        server: {
          baseDir: '<%= path.build.root %>',
          middleware: [history()]
        }
      },
      bsFiles: {
        src: [
          // @note In hot reloading mode for JS files changes watches `chockidar-socket-emitter` and emits directly to `systemjs-hot-reloader`
          !this.config('env.hotModuleRloading') ? '<%= path.build.root %>/**/*.js' : null,
          '<%= path.build.root %>/**/*.css',
          '<%= path.build.root %>/**/*.html',
          '<%= path.build.root %>/**/*.{png,jpg,jpeg,gif,svg,ico}',
          '<%= path.build.root %>/**/*.{xml,txt}',
          '<%= path.build.root %>/**/*.{eot,ttf,woff}'
        ]
      }
    }
  })
}
