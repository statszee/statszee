'use strict'

const Chai   = require('chai')
const should = Chai.should()
const expect = Chai.expect

const Moment = require('moment')

describe('DateParserService', () => {

  describe('class & methods', () => {
    it('should exist', () => {
      should.exist(global.app.services.DateParserService)
    })
    it('apply should exist', () => {
      expect(global.app.services.DateParserService).to.respondTo('apply')
    })
  })

  describe("special cases",()=>{
    it('should round to first valid day with a null rounding', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), null)
      checkDates(x, getExpectedDate('01-01-0000 00:00:00'))
    })
  })

  describe('year rouding', () => {
    it('should round to year', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '1y')
      checkDates(x, getExpectedDate('01-01-2017 00:00:00'))
    })
    it('should round to two year', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '2y')
      checkDates(x, getExpectedDate('01-01-2016 00:00:00'))
    })
  })

  describe('month rouding', () => {
    it('should round to month', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '1mo')
      checkDates(x, getExpectedDate('01-03-2017 00:00:00'))
    })
    it('should round to three month', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '3mo')
      checkDates(x, getExpectedDate('01-01-2017 00:00:00'))
    })
  })

  describe('day rouding', () => {
    it('should round to day', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '1d')
      checkDates(x, getExpectedDate('14-03-2017 00:00:00'))
    })
    it('should round to seven day', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '8d')
      checkDates(x, getExpectedDate('08-03-2017 00:00:00'))
    })
  })

  describe('hour rouding', () => {
    it('should round to hour', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '1h')
      checkDates(x, getExpectedDate('14-03-2017 14:00:00'))
    })
    it('should round to three hour', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '3h')
      checkDates(x, getExpectedDate('14-03-2017 12:00:00'))
    })
  })

  describe('minute rouding', () => {
    it('should round to minute', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '1m')
      checkDates(x, getExpectedDate('14-03-2017 14:23:00'))
    })
    it('should round to 15 minute', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '15m')
      checkDates(x, getExpectedDate('14-03-2017 14:15:00'))
    })
  })

  describe('second rouding', () => {
    it('should round to second', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '1s')
      checkDates(x, getExpectedDate('14-03-2017 14:23:12'))
    })
    it('should round to thirteen second', () => {
      const x = global.app.services.DateParserService.apply(getBaseTestDate(), '30s')
      checkDates(x, getExpectedDate('14-03-2017 14:23:00'))
    })
  })

})

function getBaseTestDate() {
  return Moment.utc('14-03-2017 14:23:12', 'DD-MM-YYYY HH:mm:ss')
}
function getExpectedDate(format) {
  return Moment.utc(format, 'DD-MM-YYYY HH:mm:ss')
}
function checkDates(x,y) {
  (x.toISOString() == y.toISOString()).should.be.equal(true)
}
