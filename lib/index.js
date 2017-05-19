var ndjson = require('ndjson')
var jsonist = require('jsonist')
var through2 = require('through2')
var template = require('lodash.template')
var get = require('lodash.get')
var set = require('lodash.set')

module.exports = function (stream, urlTemplate, copy, cb) {
  var compiled = template(urlTemplate)
  if (!copy) copy = []
  return stream
    .pipe(ndjson.parse())
    .pipe(through2.obj(function (obj, enc, cb) {
      var url = compiled(obj)
      jsonist.get(url, function (err, result) {
        if (err) return cb(err)
        copy.forEach(function (path) {
          var _val = get(obj, path)
          set(result, path, _val)
        })
        cb(null, result)
      })
    }))
    .pipe(ndjson.stringify())
}
