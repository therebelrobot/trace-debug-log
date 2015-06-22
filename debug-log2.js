'use strict'

var chalk = require('chalk')
var path = require('path')
var stackTrace = require('stack-trace')
var util = require('util')

module.exports = function (section) {
  section = section.toUpperCase()

  function _logger () {
    var _section = section

    if (!~_logger.environment().indexOf(section)) {
      return false
    }

    // convert to real array
    var args = Array.prototype.slice.call(arguments)

    // actual message parameters
    var callSite = stackTrace.get()[1]
    var file = path.basename(callSite.getFileName())
    var line = callSite.getLineNumber()
    var method = callSite.getFunctionName()
    var pid = process.pid

    // construct stack trace line
    args.unshift(chalk.grey(util.format('%s:%s in %s()', file, line, method)))

    // construct message
    var msg = util.format.apply(util, args)

    // send message
    console.error('%s %d: %s', _section, pid, msg)

    return args
  }

  _logger.environment = function (section) {
    if (!process.env.NODE_DEBUG) {
      return section ? false : []
    }

    process.env.NODE_DEBUG = process.env.NODE_DEBUG.toUpperCase()

    var envs = process.env.NODE_DEBUG.split(/\ *, */g)

    return section ? ~envs.indexOf(section) : envs
  }

  _logger.toggle = function () {
    _logger.environment(section) ? this.disable(section) : this.enable(section)
  }

  _logger.enable = function () {
    if (!_logger.environment(section)) {
      var envs = _logger.environment()

      envs.push(section)

      process.env.NODE_DEBUG = envs.join()
    }
  }

  _logger.disable = function () {
    var envs = _logger.environment()

    var index = envs.indexOf(section)

    if (index > -1) {
      envs.splice(index, 1)
    }

    process.env.NODE_DEBUG = envs.join()
  }

  return _logger
}
