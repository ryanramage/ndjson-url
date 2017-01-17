var ndjson = require('ndjson')
var jsonist = require('jsonist')
var through2 = require('through2')
var template = require('lodash.template')

module.exports = function (stream, urlTemplate, cb) {
  var compiled = template(urlTemplate)
  return stream
    .pipe(ndjson.parse())
    .pipe(through2.obj(function (obj, enc, cb){
      var url = compiled(obj)
      jsonist.get(url, function (err, result) {
        if (err) return cb(err)
        cb(null, result)
      })
    }))
    .pipe(ndjson.stringify())
}
