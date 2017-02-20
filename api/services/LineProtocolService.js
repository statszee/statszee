'use strict'

const Service = require('trails/service')
const moment  = require('moment')

/**
 * @module LineProtocolService
 * @description TODO document Service
 */
module.exports = class LineProtocolService extends Service {
  // TODO: Refactor into a Point class and a PointArray class

  // TODO: Only accept full line (client must send complete lines)
  validate(line) {
    if (typeof line !== 'string') return false
    const lineElement = line.split(' ')
    if (lineElement.length != 2 && lineElement.length != 3) return false
    if (isNaN(lineElement[1])) return false
    if (lineElement[2]) {
      const timeDefinition = lineElement[2].split('|')
      if (timeDefinition.length != 1 && timeDefinition.length != 2)
        return false
      if (timeDefinition.length == 1) {
        if (isNaN(timeDefinition[0])) return false
      }
      if (timeDefinition.length == 2) {
        if (isNaN(timeDefinition[0])) return false
        if (!this.testTimeFormat(timeDefinition[1])) return false
      }
    }
    return true
  }

  testTimeFormat(timeFormat) {
    return /^([0-9]+)(y|mo|d|h|m|s)$/.test(timeFormat)
  }

  parse(line) {
    if (this.validate(line)) {
      const lineParsed = line.split(' ')
      let timeDetails  = []
      if (lineParsed[2]) {
        timeDetails = lineParsed[2].split('|')
      }

      return this.toObject(lineParsed[0], lineParsed[1], timeDetails[0], timeDetails[1])
    }
    else {
      return false
    }
  }

  // TODO: Choose a correct naming/format for timestamp & timeUnit
  toObject(namespace, value, timestamp, timeUnit) {
    return {
      namespace: namespace,
      value: value,
      timestamp: timestamp || moment().format('X'),
      timeUnit: timeUnit || '1h',
    }
  }

  explode(lines) {
    if (!lines || typeof lines !== 'string') return []
    return lines.split('\n')
  }

}

