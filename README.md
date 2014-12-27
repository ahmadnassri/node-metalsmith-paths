
# metalsmith-paths

  A Metalsmith plugin that adds file path values (`dirname`, `extname`, `basename`, `path`) to metadata.

## Installation

    $ npm install metalsmith-paths

## Usage

```js
var Metalsmith = require('metalsmith');
var paths = require('metalsmith-paths');

var metalsmith = new Metalsmith(__dirname)
  .use(paths());
```

#### CLI

  You can also use the plugin with the Metalsmith CLI by adding a key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-paths": true
  }
}
```

## License

  MIT
