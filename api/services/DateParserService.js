'use strict'

const Service = require('trails/service')
const moment  = require('moment')

/**
 * @module DateParserService
 * @description TODO document Service
 */
module.exports = class DateParserService extends Service {
  apply(date, format) {
    if (!format) return moment.utc('01-01-0000 00:00:00', 'DD-MM-YYYY HH:mm:ss')
    const d = format.match(/^([0-9]+)(y|mo|d|h|m|s)$/)

    if (d[0]) {
      const measure     = parseInt(d[1])
      const measureUnit = DateParserService.measureToMomentMeasure(d[2])

      let trasformedDate = date

      if (measure > 1) {
        trasformedDate = DateParserService.applyDiff(trasformedDate, measureUnit, measure)
      }
      trasformedDate = trasformedDate.startOf(measureUnit)

      return trasformedDate
    }
    else {
      return false
    }
  }

  static measureToMomentMeasure(measure) {
    // TODO: Why not just use moment representation?
    const tmp = {
      y: 'year',
      mo: 'month',
      d: 'day',
      h: 'hour',
      m: 'minute',
      s: 'second'
    }
    return (measure && tmp[measure]) ? tmp[measure] : null
  }

  static applyDiff(date, type, offset) {
    // Day use a different naming in Moment
    let val = (type == 'day') ? date.date() : date[type]()
    val = val % offset

    return date.subtract(val, type)
  }
}
