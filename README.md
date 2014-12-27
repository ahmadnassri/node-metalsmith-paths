
# metalsmith-path

  A Metalsmith plugin that adds file path values (`dirname`, `extname`, `basename`, `path`) to metadata.

## Installation

    $ npm install metalsmith-path

## Usage

```js
var Metalsmith = require('metalsmith');
var path = require('metalsmith-path');

var metalsmith = new Metalsmith(__dirname)
  .use(path());
```

#### CLI

  You can also use the plugin with the Metalsmith CLI by adding a key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-path": true
  }
}
```

## License

  MIT
