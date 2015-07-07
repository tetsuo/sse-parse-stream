var test = require('tap').test;
    parse = require('./'),
    through = require('through2'),
    tr = through();

test(function (t) {
  t.plan(2);

  tr
    .pipe(parse())
    .pipe(through.obj(function (row, enc, cb) {
      t.equal(row[0], 'sup');
      t.deepEqual(row[1], { x: '555' });
      cb();
    }));

  tr.end('event: sup\ndata: { "x": "555" }\n\n');
});