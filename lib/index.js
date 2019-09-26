var ndjson = require('ndjson')
var get = require('lodash.get')
var set = require('lodash.set')
var merge = require('lodash.merge')
var jsonist = require('jsonist')
var through2 = require('through2')
var template = require('lodash.template')

module.exports = function (stream, urlTemplate, copy, method, config, cb) {
  var compiled = template(urlTemplate)
  if (!copy) copy = []
  return stream
    .pipe(ndjson.parse())
    .pipe(through2.obj(function (obj, enc, cb) {
      var url = compiled(obj)
      console.error(url)
      jsonist[method](url, function (err, result) {
        if (err) return cb(err)
        copy.forEach(function (path) {
          var _val = get(obj, path)
          set(result, path, _val)
        })
        if (config.merge) result = merge(obj, result)
        cb(null, result)
      })
    }))
    .pipe(ndjson.stringify())
}
