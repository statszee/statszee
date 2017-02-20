'use strict'

const Chai   = require('chai')
const should = Chai.should()
const expect = Chai.expect

const moment = require('moment')

describe('LineProtocolService', () => {

  describe('class & methods', () => {
    it('should exist', () => {
      should.exist(global.app.services.LineProtocolService)
    })
    it('validate should exist', () => {
      expect(global.app.services.LineProtocolService).to.respondTo('validate')
    })
    it('parse should exist', () => {
      expect(global.app.services.LineProtocolService).to.respondTo('parse')
    })
    it('explode should exist', () => {
      expect(global.app.services.LineProtocolService).to.respondTo('explode')
    })
  })

  describe('explode', () => {
    it('should return an array', () => {
      global.app.services.LineProtocolService.explode(`test
test`).should.be.a('array')
      global.app.services.LineProtocolService.explode(`test
test`).length.should.be.equal(2)
    })
    it('should return an array of one element', () => {
      global.app.services.LineProtocolService.explode('test').should.be.a('array')
      global.app.services.LineProtocolService.explode('test').length.should.be.equal(1)
    })
    it('should return an array of one element with blank body', () => {
      global.app.services.LineProtocolService.explode().should.be.a('array')
      global.app.services.LineProtocolService.explode().length.should.be.equal(0)
    })
  })

  describe('validate', () => {
    it('should return false with no namespace', () => {
      global.app.services.LineProtocolService.validate('10').should.be.equal(false)
    })
    it('should return false with no value', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter').should.be.equal(false)
    })
    it('should return false with no correct separation between namespace & value', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter10').should.be.equal(false)
    })
    it('should return false with invalid value', () => {
      global.app.services.LineProtocolService.validate('statszee.test.gender male').should.be.equal(false)
    })
    it('should return false with invalid time', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter 10 2016-01-12T00:00:00Z').should.be.equal(false)
    })
    it('should return false with invalid timeunit', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter 10 ' + moment().format('X') + '|1').should.be.equal(false)
    })
    it('should return true with a valid minimal line', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter 10').should.be.equal(true)
    })
    it('should return true with a valid minimal+timestamp line', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter 10 ' + moment().format('X')).should.be.equal(true)
    })
    it('should return true with a valid full line', () => {
      global.app.services.LineProtocolService.validate('statszee.test.parameter 10 ' + moment().format('X') + '|1d').should.be.equal(true)
    })
  })

  describe('parse', () => {
    it('should return false with no namespace', () => {
      global.app.services.LineProtocolService.parse('10').should.be.equal(false)
    })
    it('should return false with no value', () => {
      global.app.services.LineProtocolService.parse('statszee.test.parameter').should.be.equal(false)
    })
    it('should return false with no correct separation between namespace & value', () => {
      global.app.services.LineProtocolService.parse('statszee.test.parameter10').should.be.equal(false)
    })
    it('should return false with invalid value', () => {
      global.app.services.LineProtocolService.parse('statszee.test.gender male').should.be.equal(false)
    })
    it('should return false with invalid time', () => {
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 2016-01-12T00:00:00Z').should.be.equal(false)
    })
    it('should return false with invalid timeunit', () => {
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + moment().format('X') + '|1').should.be.equal(false)
    })
    it('should return valid object with a valid minimal line', () => {
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10').namespace.should.be.equal('statszee.test.parameter')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10').value.should.be.equal('10')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10').timestamp.should.be.equal(moment().format('X'))
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10').timeUnit.should.be.equal('1h')
    })
    it('should return valid object with a valid minimal+timestamp line', () => {
      const t = moment().format('X')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t).namespace.should.be.equal('statszee.test.parameter')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t).value.should.be.equal('10')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t).timestamp.should.be.equal(t)
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t).timeUnit.should.be.equal('1h')
    })
    it('should return valid object with a valid full line', () => {
      const t = moment().format('X')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t + '|1d').namespace.should.be.equal('statszee.test.parameter')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t + '|1d').value.should.be.equal('10')
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t + '|1d').timestamp.should.be.equal(t)
      global.app.services.LineProtocolService.parse('statszee.test.parameter 10 ' + t + '|1d').timeUnit.should.be.equal('1d')
    })
  })

})
