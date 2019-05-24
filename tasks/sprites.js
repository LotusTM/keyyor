module.exports = function () {
  // Spritesmith
  // https://github.com/Ensighten/grunt-spritesmith
  // Generates sprites and scss from set of images

  this.config('sprite', {
    build: {
      src: '<%= path.source.sprites %>/{,**/}*',
      dest: '<%= file.build.sprite.compiled %>',
      destCss: '<%= path.temp.styles %>/_sprites.map.scss',
      padding: 2,
      engine: 'gmsmith',
      cssTemplate: ({ sprites }) => {
        const spritesMap = sprites
          .map(({ name, px }) => `'${name}': ( width: ${px.width}, height: ${px.height}, offset-x: ${px.offset_x}, offset-y: ${px.offset_y} )`)
          .join(',\n  ')

        return `
          // =============================================================================
          // ^SPRITES.MAP
          // =============================================================================
          // DO NOT EDIT!
          // This file generated by Grunt task. It will override all your changes.
          //
          // Dynamically generated map with list of sprites.
          //
          // Based on images which should be placed in specified in
          // Grunt settings \`sprites\` directory.
          //
          // Each sprite will be converted into class with specified
          // in project settings \`$sprites-prefix\` (by default \`sprite--\`).
          //
          // @dep grunt-spritesmith
          //
          // @type {map} - 2-dimensional map of sprites
          //
          // @example
          //
          //  @include sprites();     // will output to CSS all your sprites
          //  @include sprite(arrow); // will output to CSS \`.sprite--arrow { ... }\`

          $grunt-sprites: (
            ${spritesMap}
          );
        `
      }
    }
  })

  // Tiny PNG
  // https://github.com/marrone/grunt-tinypng
  // Image optimization via tinypng service

  this.config.merge({
    tinypng: {
      sprites: {
        options: {
          apiKey: '<%= env.tinypng.api.key %>',
          checkSigs: true,
          sigFile: '<%= path.temp.data %>/sprites-hash.json',
          summarize: true,
          stopOnImageError: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.build.sprites %>',
          src: '{,**/}*.{jpg,jpeg,png}',
          dest: '<%= path.build.sprites %>'
        }]
      }
    }
  })

  // Watch
  // https://github.com/gruntjs/grunt-contrib-watch
  // Watches scss, js etc for changes and compiles them

  this.config.merge({
    watch: {
      sprites: {
        files: ['<%= path.source.sprites %>/{,**/}*.{jpg,jpeg,gif,png}'],
        tasks: ['sprite']
      }
    }
  })
}
