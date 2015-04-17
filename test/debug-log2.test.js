var expect = require('chai').expect
var debug = require('../debug-log2')

describe('debug-log2', function () {
  it('should return a function', function _debugReturnFunction(done) {
    expect(debug).to.be.a('function')
    done()
  })
  it('should return file position if empty', function _debugReturnFunction(done) {
    debug.enable()
    var returns = debug()
    expect(returns).to.be.an('array')
    expect(returns.length).to.equal(1)
    done()
  })
  it('should return filename', function _debugReturnFilename(done) {
    debug.enable()
    var returns = debug('Hello')[0].split('\u001b[90m')[1].split('\u001b[39m')[0]
    var filename = returns.split(':')[0]
    expect(filename).to.be.a('string')
    expect(filename).to.equal('debug-log2.test.js')
    done()
  })
  it('should return function name', function _debugReturnFunctionName(done) {
    debug.enable()
    var returns = debug('Hello')[0].split('\u001b[90m')[1].split('\u001b[39m')[0]
    var funcName = returns.split(' ')
    funcName = funcName[funcName.length-1]
    expect(funcName).to.be.a('string')
    expect(funcName).to.equal('_debugReturnFunctionName()')
    done()
  })
  it('should return line number', function _debugReturnLineNumber(done) {
    debug.enable()
    var returns = debug('Hello')[0].split('\u001b[90m')[1].split('\u001b[39m')[0]
    var filename = returns.split(':')[1].split(' ')[0]
    expect(filename).to.be.a('string')
    expect(filename).to.equal('35')
    done()
  })
  it('should return a string parameter', function _debugReturnStringParam(done) {
    debug.enable()
    var returns = debug('Hello')[1]
    expect(returns).to.be.a('string')
    expect(returns).to.equal('Hello')
    done()
  })
  it('should return a number parameter', function _debugReturnNumberParam(done) {
    debug.enable()
    var returns = debug(45)[1]
    expect(returns).to.be.a('number')
    expect(returns).to.equal(45)
    done()
  })
  it('should return an array parameter', function _debugReturnArrayParam(done) {
    debug.enable()
    var returns = debug(["foo","bar"])[1]
    expect(returns).to.be.an('array')
    expect(returns).to.deep.equal(["foo","bar"])
    done()
  })
  it('should return an object parameter', function _debugReturnObjectParam(done) {
    debug.enable()
    var returns = debug({foo:'bar'})[1]
    expect(returns).to.be.an('object')
    expect(returns).to.deep.equal({foo:"bar"})
    done()
  })
  it('should return an multiple parameters', function _debugReturnMultipleParams(done) {
    debug.enable()
    var returns = debug(45, 'hello')
    returns.shift();
    expect(returns.length).to.be.above(1)
    done()
  })
  it('should return false if DEBUG variable is not set in environment', function _debugNoDEBUG(done) {
    debug.disable()
    var returns = debug('false hello')
    expect(returns).to.be.false
    done()
  })
  describe('enable', function() {
    it('should return a function', function _debugOnReturnFunction(done) {
      expect(debug.enable).to.be.a('function')
      done()
    })
    it('should turn on DEBUG environment variable', function _debugOnFunctions(done) {
      debug.enable()
      debug(process.env.DEBUG)
      expect(process.env.DEBUG).to.equal('true')
      done()
    })
  })
  describe('disable', function() {
    it('should return a function', function _debugOffReturnFunction(done) {
      expect(debug.disable).to.be.a('function')
      done()
    })
    it('should turn disable DEBUG environment variable', function _debugOffFunctions(done) {
      debug.disable()
      expect(process.env.DEBUG).to.equal('false')
      done()
    })
  })
  describe('toggle', function() {
    it('should return a function', function _debugToggleReturnFunction(done) {
      expect(debug.toggle).to.be.a('function')
      done()
    })
    it('should toggle DEBUG environment variable', function _debugToggleFunctions(done) {
      debug.disable()
      expect(process.env.DEBUG).to.equal('false')
      debug.toggle()
      expect(process.env.DEBUG).to.equal('true')
      debug.toggle()
      expect(process.env.DEBUG).to.equal('false')
      done()
    })
  })
})
