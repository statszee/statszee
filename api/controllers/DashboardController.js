'use strict'

const Controller = require('trails/controller')

/**
 * @module DashboardController
 * @description TODO document Controller.
 */
module.exports = class DashboardController extends Controller {
  render(req, res) {
    res.sendFile(
      this.app.config.main.paths.root + '/' + this.app.config.web.views.path + '/dashboard.html'
    )
  }
}

