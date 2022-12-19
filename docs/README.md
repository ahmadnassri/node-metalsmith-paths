## Install

```bash
npm install metalsmith-paths
```

## API

```js
const metalsmith = new Metalsmith(__dirname)
  .use(paths({
    property: "paths"
  }))
```

given the following directory structure:

```plain
src/
└── blog
    └── post.html
```

The following metadata will be generated:

| metadata      | value             |
| ------------- | ----------------- |
| `path.base`   | `post.html`       |
| `path.dir`    | `blog`            |
| `path.ext`    | `.html`           |
| `path.name`   | `post`            |
| `path.href`   | `/blog/post.html` |
| `path.dhref`  | `/blog/`          |

## CLI

You can also use the plugin with the Metalsmith CLI by adding a key to your `metalsmith.json` file:

```json
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
| `winToUnix`      | exchange `\` for `/` on Windows    | true      |

### directoryIndex

Removes the filename from the `href` attribute if it matches the value of
`directoryIndex`. Default: disabled. For example, the following configuration:

```json
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

| Filename                      | `path.href`                   |
| ----------------------------- | ----------------------------- |
| `/index.html`                 | `/`                           |
| `/portfolio/index.html`       | `/portfolio/`                 |
| `/portfolio/project1.html`    | `/portfolio/project1.html`    |
| `/portfolio/project2.html`    | `/portfolio/project2.html`    |
