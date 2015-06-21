# debug-log2

An environment based mini-lib to replace console.log in Node.js applications. Adds log context information automatically. Without the `DEBUG` environment variable, all logs are silent.

## Install

```sh
npm install --save debug-log2
```

## Usage

```js
var debug = require('debug-log2')

debug.enable()

function _namedFunction(param){
  debug('This is an example', param)
}

_namedFunction('function parameter')
// filename.js:6 in _namedFunction() This is an example function parameter
_namedFunction(42)
// app.js:6 in _namedFunction() This is an example 42
_namedFunction({param:'foo'})
// app.js:6 in _namedFunction() This is an example { param: 'foo' }
```

###`debug.enable()`

This is a helper function so you do not need to set the environment variable prior to running your app. If this gets run, `process.env.DEBUG` will be set to true, and all debug logs will be printed to console.

###`debug.disable()`

This is a helper function to unset the debug variable. If this gets run, `process.env.DEBUG` will be set to false, and all debug logs will be ignored.

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