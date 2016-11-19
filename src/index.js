import path from 'path'
import { debuglog } from 'util'

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
export default function (options) {
  options = Object.assign({}, defaults, options)

  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      debug('process file: %s', file)

      if (path.parse) {
        debug('[node >= 0.11.15] using path.parse')

        files[file][options.property] = path.parse(file)
      } else {
        // add file path info
        let extname = path.extname(file)

        files[file][options.property] = {
          base: path.basename(file),
          dir: path.dirname(file).split(path.sep).join('/'),
          ext: extname,
          name: path.basename(file, extname)
        }
      }

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

      if (!options.directoryIndex || path.basename(file) !== options.directoryIndex) {
        href += path.basename(file)
      }

      files[file][options.property].href = href
      files[file][options.property].dhref = dhref
    })
  }
}
