const { cyan } = require('chalk')

module.exports = ({ registerMultiTask, log, verbose, file: { write }, util: { pluralize } }) =>
  registerMultiTask('writeJSON', 'Write a JSON-file', function () {
    const { dataFn } = this.options()

    if (typeof dataFn !== 'function') throw new Error(`\`dataFn\` should be a function which returns data`)
    if (!this.files.length) return log.error('No files specified.')

    const data = dataFn()

    this.files.forEach(({ dest }) => {
      if (!dest) return log.error('No dest file specified')

      verbose.ok(`\nProcessed: ${cyan(dest)}`)

      const exps = Object.keys(data).reduce((exps, key) => {
        return `${exps}\nexport const ${key} = ${JSON.stringify(data[key], null, 2)}`
      }, '')

      const expDefaults = Object.keys(data).reduce((exps, key) => `${exps}${key},\n`, '')

      write(dest, `${exps}\n\nexport default {\n${expDefaults}}`)
      verbose.ok(`File ${cyan(dest)} created`)
    })

    log.ok(`${cyan(this.files.length)} ${pluralize(this.files.length, 'file/files')} processed`)
  })
