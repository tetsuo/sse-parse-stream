var combine = require('stream-combiner2'),
    split = require('split2'),
    through = require('through2');

var pattern = /^(data|event):\s*(.+)$/;

module.exports = function () {
  return combine(split('\n\n'), through.obj(write));

  function write (row, enc, cb) {
    var pair = row.toString().split('\n')
      .reduce(function (acc, line, i) {
        line = line.match(pattern)[2];
        i && (line = JSON.parse(line));
        acc.push(line);
        return acc;
      }, []);
    cb(null, pair);
  }
}
