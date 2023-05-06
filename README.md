# dezutil

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/dezutil.svg?style=flat-square
[npm-url]: https://npmjs.org/package/dezutil
[downloads-image]: https://img.shields.io/npm/dm/dezutil.svg?style=flat-square

Logging module.

## Usage

### Install

```console
npm install dezutil
```

### Initializing

```js
import Log from 'dezutil'

const logger = new Log()

logger.log('Hello, World!')
```

The default behaviour is to add a timestamp to each log statement.

```terminal
[2023-05-05 17:36:52.353] Hello, World!
```

You can change this by provinding an prefix object as the first parameter.

```js
import Log from 'dezutil'

const logger = new Log('API')

logger.log('Hello, World!')
```

```terminal
[2023-05-05 17:36:52.353] [API] Hello, World!
```

You can also destructure the logger into 3 functions, log(), slog(), and elog().

```js
import Log from 'dezutil'

const { log, elog, slog } = new Log('INFO').create()

log('Hello, World!')
```

```terminal
[2023-05-05 17:36:52.353] [INFO] Hello, World!
```

Or you can use the default log() from import which has no prefix.

```js
import { log } from 'dezutil'

log('Hello, World!')
```

```terminal
[2023-05-05 17:36:52.353] Hello, World!
```
