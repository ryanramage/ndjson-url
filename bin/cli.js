#!/usr/bin/env node
var config = require('rc')('ndjsonurl', {
  copy: null,
  method: 'get'
})

var urlTemplate = config._[0]
var copy = null
if (config.copy) {
  copy = config.copy.split(',')
}
require('../')(process.stdin, urlTemplate, copy, config.method, config).pipe(process.stdout)
