'use strict'

var debug = require('debug')('metalsmith-paths')
var path = require('path')

/**
 * @param {Object} options
 * @return {Function}
 */

module.exports = function plugin (options) {
  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach(function (file) {
      debug('process file: %s', file)

      if (path.parse) {
        debug('[node >= 0.11.15] using path.parse')

        files[file].path = path.parse(file)
      } else {
        // add file path info
        var extname = path.extname(file)

        files[file].path = {
          base: path.basename(file),
          dir: path.dirname(file),
          ext: extname,
          name: path.basename(file, extname)
        }
      }

      // add path meta for use in links in templates
      files[file].path.href = '/' + files[file].path.dir + '/'
    })
  }
}
