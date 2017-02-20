'use strict'

const Controller = require('trails/controller')

/**
 * @module MetricsListingController
 * @description TODO document Controller.
 */
module.exports = class MetricsListingController extends Controller {
  get(req, res) {

    let query = {
      where: {}
    }

    if (req.query.query) {
      let requestQuery = req.query.query.replace("*", "%")
      if (requestQuery.indexOf("%") == -1) requestQuery = "%" + requestQuery + "%"
      query.where.namespace = {$like: requestQuery}
    }


    this.app.orm.Metric.findAll(query)
      .then(stats => {
        res.send(stats)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  }
}

