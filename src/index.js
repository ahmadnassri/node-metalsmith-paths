const { parse, basename } = require('path')
const { debuglog } = require('util')

const debug = debuglog('metalsmith-paths')
const defaults = {
  property: 'path',
  directoryIndex: false,
  hrefIndex: false
}

/**
 * @param {Object} options
 * @return {Function}
 */
module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      debug('process file: %s', file)

      files[file][options.property] = parse(file)

      // In some versions of node/path, 'dir' at root may be either '.' or empty
      // Normalize this property to be empty
      if (files[file][options.property].dir === '.') {
        files[file][options.property].dir = ''
      }

      // generate href
      let href = '/'

      if (files[file][options.property].dir && files[file][options.property].dir !== '.') {
        href += files[file][options.property].dir + '/'
      }

      const dhref = href

      if (!options.directoryIndex || basename(file) !== options.directoryIndex) {
        href += basename(file)
      }

      files[file][options.property].href = href
      files[file][options.property].dhref = dhref
    })
  }
}
