'use strict'

const _      = require('lodash')
const moment = require('moment')
const chance = require('chance')()

module.exports = class LineProtocolHelper {
  static randomPoint(returnObject) {
    returnObject = returnObject || false;
    return this.point({
      namespace: chance.string({length: 5, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
      value: chance.integer({min: 1, max: 30}),
      timestamp: chance.date({year: moment().format('YYYY')}),
      timeUnit: chance.pickone(['1h', '1d', '7d'])
    }, returnObject)
  }

  static point(options, returnObject) {
    returnObject = returnObject || false;
    options = _.extend({
      namespace: 'test.statszee.key',
      value: 1,
      timestamp: moment().toDate(),
      timeUnit: '1h'
    }, options)

    options.timestamp = moment(options.timestamp).utc().format('X')

    return (returnObject) ? options : this.objToString(options)
  }

  static objToString(obj) {
    return `${obj.namespace} ${obj.value} ${obj.timestamp}|${obj.timeUnit}`
  }
}
