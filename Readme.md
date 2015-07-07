# sse-parse-stream

duplex stream to parse [sse](https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events).

# example

```js
var parse = require('sse-parse-stream'),
    through = require('through2'),
    tr = through();

tr
  .pipe(parse())
  .pipe(through.obj(function (row, enc, cb) {
    console.log(row);
    cb();
  }));

tr.write('event: sup\ndata: { "x": "555" }\n\n');
```

generates:

```
[ 'sup', { x: '555' } ]
```

# api

```js
var parse = require('sse-parse-stream')
```

## var parser = parse()

Returns a duplex stream that takes in [event stream](https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events#Event_stream_format) text and produces rows of `[event, data]` pairs.

# license

mit