# Metalsmith Paths

A Metalsmith plugin that adds file path values (`base`, `dir`, `ext`, `name`, `href`) to metadata `path` property.

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

## Install

``` bash
npm install metalsmith-paths
```

## API

``` js
const metalsmith = new Metalsmith(__dirname)
  .use(paths({
    property: "paths"
  }))
```

given the following directory structure:

``` plain
src/
└── blog
    └── post.html
```

The following metadata will be generated:

| metadata     | value             |
|--------------|-------------------|
| `path.base`  | `post.html`       |
| `path.dir`   | `blog`            |
| `path.ext`   | `.html`           |
| `path.name`  | `post`            |
| `path.href`  | `/blog/post.html` |
| `path.dhref` | `/blog/`          |

## CLI

You can also use the plugin with the Metalsmith CLI by adding a key to your `metalsmith.json` file:

``` json
{
  "plugins": {
    "metalsmith-paths": {
      "property": "paths"
    }
  }
}
```

## Options

| name             | description                        | default   |
| ---------------- | ---------------------------------- | --------- |
| `property`       | property to store the path data to | `path`    |
| `directoryIndex` | remove the filename if it matches  | disabled  |
| `parseWindows`   | exchange `\` for `/` on Windows systems  | true  |

### directoryIndex

Removes the filename from the `href` attribute if it matches the value of
`directoryIndex`. Default: disabled. For example, the following configuration:

``` json
{
  "plugins": {
    "metalsmith-paths": {
      "property": "path",
      "directoryIndex": "index.html"
    }
  }
}
```

Would produce the following filenames:

| Filename                   | `path.href`                |
|----------------------------|----------------------------|
| `/index.html`              | `/`                        |
| `/portfolio/index.html`    | `/portfolio/`              |
| `/portfolio/project1.html` | `/portfolio/project1.html` |
| `/portfolio/project2.html` | `/portfolio/project2.html` |

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-metalsmith-paths

[release-url]: https://github.com/ahmadnassri/node-metalsmith-paths/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-metalsmith-paths

[semantic-url]: https://github.com/ahmadnassri/node-metalsmith-paths/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
