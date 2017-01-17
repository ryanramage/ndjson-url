#!/usr/bin/env node
var urlTemplate = process.argv[2]
require('../')(process.stdin, urlTemplate).pipe(process.stdout)
