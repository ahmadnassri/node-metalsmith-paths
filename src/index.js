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
      debug('file: %s', file)

      // add file path info
      files[file].dirname = path.dirname(file)
      files[file].extname = path.extname(file)
      files[file].basename = path.basename(file)

      // add path meta for use in links in templates
      files[file].path = '/' + path.dirname(file) + '/'
    })
  }
}
