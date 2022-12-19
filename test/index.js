const plugin = require('..')
const { test } = require('tap')

test('should be a plugin', (assert) => {
  assert.plan(8)

  assert.type(plugin, 'function')

  const files = {
    'path/to/file.ext': {}
  }

  plugin()(files, null, () => {
    assert.type(files['path/to/file.ext'].path, Object)

    assert.equal(files['path/to/file.ext'].path.base, 'file.ext')
    assert.equal(files['path/to/file.ext'].path.dir, 'path/to')
    assert.equal(files['path/to/file.ext'].path.ext, '.ext')
    assert.equal(files['path/to/file.ext'].path.name, 'file')
    assert.equal(files['path/to/file.ext'].path.href, '/path/to/file.ext')
    assert.equal(files['path/to/file.ext'].path.dhref, '/path/to/')
  })
})

test('should use custom property', (assert) => {
  assert.plan(7)

  const files = {
    'path/to/file.ext': {}
  }

  plugin({ property: 'foo' })(files, null, () => {
    assert.type(files['path/to/file.ext'].foo, Object)

    assert.equal(files['path/to/file.ext'].foo.base, 'file.ext')
    assert.equal(files['path/to/file.ext'].foo.dir, 'path/to')
    assert.equal(files['path/to/file.ext'].foo.ext, '.ext')
    assert.equal(files['path/to/file.ext'].foo.name, 'file')
    assert.equal(files['path/to/file.ext'].foo.href, '/path/to/file.ext')
    assert.equal(files['path/to/file.ext'].foo.dhref, '/path/to/')
  })
})

test('should respect directory indexes', (assert) => {
  assert.plan(13)

  const files = {
    'path/to/index.html': {},
    'path/to/file.ext': {}
  }

  plugin({ directoryIndex: 'index.html' })(files, null, () => {
    assert.type(files['path/to/index.html'].path, Object)

    assert.equal(files['path/to/index.html'].path.base, 'index.html')
    assert.equal(files['path/to/index.html'].path.dir, 'path/to')
    assert.equal(files['path/to/index.html'].path.ext, '.html')
    assert.equal(files['path/to/index.html'].path.name, 'index')
    assert.equal(files['path/to/index.html'].path.href, '/path/to/')

    assert.type(files['path/to/file.ext'].path, Object)

    assert.equal(files['path/to/file.ext'].path.base, 'file.ext')
    assert.equal(files['path/to/file.ext'].path.dir, 'path/to')
    assert.equal(files['path/to/file.ext'].path.ext, '.ext')
    assert.equal(files['path/to/file.ext'].path.name, 'file')
    assert.equal(files['path/to/file.ext'].path.href, '/path/to/file.ext')
    assert.equal(files['path/to/file.ext'].path.dhref, '/path/to/')
  })
})

test('should return slash on directoryIndex root', (assert) => {
  assert.plan(21)

  const files = {
    'index.html': {},
    'directory/index.html': {},
    'directory/file.html': {}
  }

  plugin({ directoryIndex: 'index.html' })(files, null, () => {
    assert.type(files['index.html'].path, Object)
    assert.equal(files['index.html'].path.base, 'index.html')
    assert.equal(files['index.html'].path.dir, '')
    assert.equal(files['index.html'].path.ext, '.html')
    assert.equal(files['index.html'].path.name, 'index')
    assert.equal(files['index.html'].path.href, '/')
    assert.equal(files['index.html'].path.dhref, '/')

    assert.type(files['directory/index.html'].path, Object)
    assert.equal(files['directory/index.html'].path.base, 'index.html')
    assert.equal(files['directory/index.html'].path.dir, 'directory')
    assert.equal(files['directory/index.html'].path.ext, '.html')
    assert.equal(files['directory/index.html'].path.name, 'index')
    assert.equal(files['directory/index.html'].path.href, '/directory/')
    assert.equal(files['directory/index.html'].path.dhref, '/directory/')

    assert.type(files['directory/file.html'].path, Object)
    assert.equal(files['directory/file.html'].path.base, 'file.html')
    assert.equal(files['directory/file.html'].path.dir, 'directory')
    assert.equal(files['directory/file.html'].path.ext, '.html')
    assert.equal(files['directory/file.html'].path.name, 'file')
    assert.equal(files['directory/file.html'].path.href, '/directory/file.html')
    assert.equal(files['directory/file.html'].path.dhref, '/directory/')
  })
})
