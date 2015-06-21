# debug-log2

Provides an alternative to [`util.debugLog`](https://nodejs.org/api/util.html#util_util_debuglog_section) with a simple stack trace, containing the filename, line number, and caller function.

This is used to create a function which conditionally writes to stderr based on the existence of a `NODE_DEBUG` environment variable. If the section name appears in that environment variable, then the returned function will be similar to `console.error()`.

## Install

```sh
npm install --save debug-log2
```

## Usage

```js
var debug = require('debug-log2')('foo')

function _namedFunction (param) {
  debug('This is an example', param)
}

_namedFunction('function parameter')
// filename.js:6 in _namedFunction() This is an example function parameter
_namedFunction(42)
// app.js:6 in _namedFunction() This is an example 42
_namedFunction({param:'foo'})
// app.js:6 in _namedFunction() This is an example { param: 'foo' }
```

## LICENSE (ISC)

Copyright (c) 2015, Trent Oswald

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
