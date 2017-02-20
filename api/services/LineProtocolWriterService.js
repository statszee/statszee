'use strict'

const Service = require('trails/service')
const moment  = require('moment')

/**
 * @module LineProtocolWriterService
 * @description TODO document Service
 */
module.exports = class LineProtocolWriterService extends Service {
  writePoint(point) {
    return new Promise((fullfill, reject) => {

      // TODO: Add Memory-cache Stat findOrCreate (for priming new Stat rows)
      this.getMetricInstance(point)
        .then((metric) => {
          point.timestamp = this.app.services.DateParserService.apply(moment.unix(parseInt(point.timestamp)), point.timeUnit) //eslint-disable-line
          point.timestamp = point.timestamp.toDate()

          // TODO: Remove ON CONFLICT and just use and UPDATE statement (if Stat findOrCreate is performed)
          return this.app.orm.Stat.sequelize.query(`
                    INSERT INTO stat (metric, datetime, count, sum, min, max, avg)
                    VALUES (
                      :metric,
                      :datetime,
                      1,
                      :value,
                      :value,
                      :value,
                      :value
                    )
                    ON CONFLICT (metric, datetime)
                    DO UPDATE SET
                      count = stat.count + 1,
                      sum = stat.sum + :value,
                      min = CASE WHEN stat.min < :value THEN stat.min ELSE :value END,
                      max = CASE WHEN stat.max > :value THEN stat.max ELSE :value END,
                      avg = stat.avg + ( (:value - stat.avg) / (stat.count + 1) )
                   `, {
                     replacements: {
                       metric: metric.id,
                       value: point.value,
                       datetime: point.timestamp,
                       type: point.timeUnit,
                     }
                   })
        })
        .then(fullfill)
        .catch(reject)
    })
  }

  getMetricInstance(point) {
    const cache = this.app.services.CacheService.getCaches()

    return new Promise((fullfill, reject) => {
      cache.get(this.getCacheKey(point), (error, metric) => {
        if (error) {
          reject(error)
        }
        else {
          if (!metric) {
            this.app.orm.Metric
              .findOrCreate({
                where: {
                  namespace: point.namespace,
                  precision: point.timeUnit
                },
                defaults: {
                  firstData: new Date(parseInt(point.timestamp + '000'))
                }
              })
              .spread((metric, isCreated) => {
                cache.set(this.getCacheKey(point), metric, {}, (error) => {
                  if (error) reject(error)
                  else fullfill(metric)
                })
              })
          }
          else {
            fullfill(metric)
          }
        }
      })
    })
  }

  getCacheKey(point) {
    return point.namespace + '_' + point.timeUnit
  }
}

