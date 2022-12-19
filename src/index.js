const { platform } = require('os')
const { parse, basename } = require('path')
const { debuglog } = require('util')

const debug = debuglog('metalsmith-paths')
const defaults = {
  property: 'path',
  directoryIndex: false,
  hrefIndex: false,
  parseWindows: true
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
      let filename = file

      // manage windows paths
      if (options.parseWindows && platform() === 'win32') {
        const driveRegex = /^[a-z]:\\{0,2}/i
        filename = file.replace(driveRegex, '/').replace(/\\{1,2}/g, '/')
        debug(filename)
      }

      debug('process file: %s (%s)', file, filename)

      files[file][options.property] = parse(filename)

      // In some versions of node/path, 'dir' at root may be either '.' or empty
      // Normalize this property to be empty
      if (files[file][options.property].dir === '.') {
        files[file][options.property].dir = ''
      }

      // generate href based on whether the file already has a leading slash or not
      let href = files[file][options.property].dir.startsWith('/') ? '' : '/'

      if (files[file][options.property].dir && files[file][options.property].dir !== '.') {
        href += files[file][options.property].dir + '/'
      }

      const dhref = href

      if (!options.directoryIndex || basename(filename) !== options.directoryIndex) {
        href += basename(filename)
      }

      files[file][options.property].href = href
      files[file][options.property].dhref = dhref
    })
  }
}
