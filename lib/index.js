'use strict'

var debug = require('debug-log')('metalsmith-paths')
var path = require('path')

/**
 * @param {Object} options
 * @return {Function}
 */

function normalizePath (pathName) {
  var normalized = pathName.split(path.sep).join('/')
  debug(`normalized ${pathName} to ${normalized}`)
  return normalized
}

module.exports = function plugin (options) {
  var opts = options || {}
  var prop = opts.property || 'path'
  var directoryIndex = opts.directoryIndex || false

  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach(function (file) {
      debug('process file: %s', file)

      if (path.parse) {
        debug('[node >= 0.11.15] using path.parse')

        files[file][prop] = path.parse(file)
        files[file][prop].dir = normalizePath(files[file][prop].dir)
      } else {
        // add file path info
        var extname = path.extname(file)

        files[file][prop] = {
          base: path.basename(file),
          dir: normalizePath(path.dirname(file)),
          ext: extname,
          name: path.basename(file, extname)
        }
      }

      // In some versions of node/path, 'dir' at root may be either '.' or empty
      // Normalize this property to be empty
      if (files[file][prop].dir === '.') {
        files[file][prop].dir = ''
      }

      // generate href
      var href = '/'

      if (files[file][prop].dir && files[file][prop].dir !== '.') {
        href += files[file][prop].dir + '/'
      }

      if (!directoryIndex || path.basename(file) !== directoryIndex) {
        href += path.basename(file)
      }

      files[file][prop].href = href
    })
  }
}
