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
      files['path/to/file.ext'].path.should.have.property('href').and.equal('/path/to/file.ext')

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
      files['path/to/file.ext'].foo.should.have.property('href').and.equal('/path/to/file.ext')

      done()
    })
  })

  it('should respect directory indexes', function (done) {
    plugin.should.be.a.Function

    var files = {
      'path/to/index.html': {},
      'path/to/file.ext': {}
    }

    plugin({
      directoryIndex: 'index.html'
    })(files, null, function () {
      files['path/to/index.html'].should.have.property('path').and.be.an.Object
      files['path/to/index.html'].path.should.have.property('base').and.equal('index.html')
      files['path/to/index.html'].path.should.have.property('dir').and.equal('path/to')
      files['path/to/index.html'].path.should.have.property('ext').and.equal('.html')
      files['path/to/index.html'].path.should.have.property('name').and.equal('index')
      files['path/to/index.html'].path.should.have.property('href').and.equal('/path/to/')

      files['path/to/file.ext'].should.have.property('path').and.be.an.Object
      files['path/to/file.ext'].path.should.have.property('base').and.equal('file.ext')
      files['path/to/file.ext'].path.should.have.property('dir').and.equal('path/to')
      files['path/to/file.ext'].path.should.have.property('ext').and.equal('.ext')
      files['path/to/file.ext'].path.should.have.property('name').and.equal('file')
      files['path/to/file.ext'].path.should.have.property('href').and.equal('/path/to/file.ext')

      done()
    })
  })

  it('should return slash on directoryIndex root', function (done) {
    plugin.should.be.a.Function

    var files = {
      'index.html': {},
      'directory/index.html': {},
      'directory/file.html': {}
    }

    plugin({
      directoryIndex: 'index.html'
    })(files, null, function () {
      files['index.html'].should.have.property('path').and.be.an.Object
      files['index.html'].path.should.have.property('base').and.equal('index.html')
      files['index.html'].path.should.have.property('dir').and.equal('')
      files['index.html'].path.should.have.property('ext').and.equal('.html')
      files['index.html'].path.should.have.property('name').and.equal('index')
      files['index.html'].path.should.have.property('href').and.equal('/')

      files['directory/index.html'].should.have.property('path').and.be.an.Object
      files['directory/index.html'].path.should.have.property('base').and.equal('index.html')
      files['directory/index.html'].path.should.have.property('dir').and.equal('directory')
      files['directory/index.html'].path.should.have.property('ext').and.equal('.html')
      files['directory/index.html'].path.should.have.property('name').and.equal('index')
      files['directory/index.html'].path.should.have.property('href').and.equal('/directory/')

      files['directory/file.html'].should.have.property('path').and.be.an.Object
      files['directory/file.html'].path.should.have.property('base').and.equal('file.html')
      files['directory/file.html'].path.should.have.property('dir').and.equal('directory')
      files['directory/file.html'].path.should.have.property('ext').and.equal('.html')
      files['directory/file.html'].path.should.have.property('name').and.equal('file')
      files['directory/file.html'].path.should.have.property('href').and.equal('/directory/file.html')

      done()
    })
  })
})
