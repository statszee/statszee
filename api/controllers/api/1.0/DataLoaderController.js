'use strict'

const Controller = require('trails/controller')
const Promise    = require("bluebird")
const moment     = require("moment")

/**
 * @module DataLoaderController
 * @description TODO document Controller.
 */
module.exports = class DataLoaderController extends Controller {
  write(req, res) {

    new Promise((fullfill, reject) => {
      if (!req.body)throw new ValidationError()
      let lines = this.app.services.LineProtocolService.explode(req.body);
      for (let i = 0; i < lines.length; i++) {
        lines[i] = this.app.services.LineProtocolService.parse(lines[i])
        if (!lines[i]) throw new ValidationError("Line " + (i + 1) + " is invalid")
      }
      return fullfill(lines)
    })
      .then(lines => {
        let promises = [];

        // TODO: Writes to DB must be batched and performed by an ETL worker, this API only need to store data on a Staging Area (es. Redis)
        lines.forEach(line => {
          promises.push(
            this.app.services.LineProtocolWriterService.writePoint(line)
          )
        })
        // From this point errors must be handled internally
        return Promise.all(promises)
      })
      .then(()=>{
        res.status(204).send()
      })
      .catch(ValidationError, error => {
          res.status(422).send(error)
        }
      )
      .catch(error => {
        this.app.log.error(error)
          res.status(500).send(error)
      })
  }
}

function ValidationError() {
}
ValidationError.prototype = Object.create(Error.prototype)
