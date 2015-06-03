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

      // add file path info
      var extname = path.extname(file)
      files[file].dirname = path.dirname(file)
      files[file].extname = extname
      files[file].basename = path.basename(file)
      files[file].name = path.basename(file, extname)

      // add path meta for use in links in templates
      files[file].path = '/' + path.dirname(file) + '/'
    })
  }
}
