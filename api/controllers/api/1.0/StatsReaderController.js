'use strict'

const Controller = require('trails/controller')
const Promise    = require("bluebird")
const moment     = require("moment")

/**
 * @module StatsReaderController
 * @description TODO document Controller.
 */
module.exports = class StatsReaderController extends Controller {
  get(req, res) {
    this.app.orm.Metric.findOne({
      where: {
        namespace: req.params.namespace,
        precision: req.params.precision
      }
    })
      .then(metric => {
        if (!metric)throw new NotFoundError()
        let query = {
          where: {
            metric: metric.id,
          },
          order: [
            ["datetime", "asc"]
          ]
        }
        if (req.query.start || req.query.end) {
          query.where.datetime = {}
        }
        if (req.query.start) {
          query.where.datetime["$gte"] = moment(req.query.start, "x").toDate()
        }
        if (req.query.end) {
          query.where.datetime["$lte"] = moment(req.query.end, "x").toDate()
        }

        return this.app.orm.Stat.findAll(query)
      })
      .then(stats => {
        res.send(
          stats.reduce((newArray, statInstance) => {
            newArray.push([
              parseInt(moment(statInstance.datetime).format("x")),
              parseFloat(statInstance.count),
              parseFloat(statInstance.sum),
              parseFloat(statInstance.min),
              parseFloat(statInstance.max),
              parseFloat(statInstance.avg)
            ])
            return newArray
          }, [])
        )
        return null;
      })
      .catch(NotFoundError, (error) => {
        res.send([])
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  }
}

function NotFoundError() {
}
NotFoundError.prototype = Object.create(Error.prototype)
