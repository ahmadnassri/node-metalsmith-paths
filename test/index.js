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
      files['path/to/file.ext'].should.have.property('path').and.be.an.Object

      files['path/to/file.ext'].path.should.have.property('base').and.equal('file.ext')
      files['path/to/file.ext'].path.should.have.property('dir').and.equal('path/to')
      files['path/to/file.ext'].path.should.have.property('ext').and.equal('.ext')
      files['path/to/file.ext'].path.should.have.property('name').and.equal('file')
      files['path/to/file.ext'].path.should.have.property('href').and.equal('/path/to/')

      done()
    })
  })

  it('should use custom property', function (done) {
    plugin.should.be.a.Function

    var files = {
      'path/to/file.ext': {}
    }

    plugin({
      property: 'foo'
    })(files, null, function () {
      files['path/to/file.ext'].should.have.property('foo').and.be.an.Object

      files['path/to/file.ext'].foo.should.have.property('base').and.equal('file.ext')
      files['path/to/file.ext'].foo.should.have.property('dir').and.equal('path/to')
      files['path/to/file.ext'].foo.should.have.property('ext').and.equal('.ext')
      files['path/to/file.ext'].foo.should.have.property('name').and.equal('file')
      files['path/to/file.ext'].foo.should.have.property('href').and.equal('/path/to/')

      done()
    })
  })
})
