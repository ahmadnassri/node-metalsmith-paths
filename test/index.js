/* global describe, it */

'use strict'

var plugin = require('..')

require('should')

describe('Metalsmith Paths', function () {
  it('should be a plugin', function (done) {
    plugin.should.be.a.Function

    var files = {
      'path/to/file.ext': {}
    }

    plugin()(files, null, function () {
      files['path/to/file.ext'].should.have.property('dirname').and.equal('path/to')
      files['path/to/file.ext'].should.have.property('extname').and.equal('.ext')
      files['path/to/file.ext'].should.have.property('basename').and.equal('file.ext')
      files['path/to/file.ext'].should.have.property('path').and.equal('/path/to/')

      done()
    })
  })
})
