'use strict'

const Controller = require('trails/controller')

/**
 * @module HeartbeatController
 * @description TODO document Controller.
 */
module.exports = class HeartbeatController extends Controller {
  /**
   * Return some info about this application
   */
  // TODO: Do some query on DB for assure that everythings is working correctly
  get(req, res) {
    res.json({
      app: {},
      server: this.app.services.ApplicationService.getApplicationInfo()
    })
  }
}

