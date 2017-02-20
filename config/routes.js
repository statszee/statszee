/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [

  /**
   * Dashboard Catch-all
   */
  {
    method:  ['GET'],
    path:    '/*',
    handler: 'DashboardController.render'
  },

  /**
   * Basic Heartbeat
   */
  {
    method:  ['GET'],
    path:    '/heartbeat',
    handler: 'HeartbeatController.get'
  },

  /**
   * Dashboard
   */
  {
    method:  ['GET'],
    path:    '/',
    handler: 'DashboardController.render'
  },


  /**
   * Write API
   */
  {
    method:  ['POST'],
    path:    '/api/write',
    handler: 'DataLoaderController.write'
  },


  /**
   * Metrics API
   */
  {
    method:  ["GET"],
    path:    "/api/metrics",
    handler: "MetricsListingController.get"
  },

  {
    method:  ["GET"],
    path:    "/api/read/:namespace/:precision",
    handler: "StatsReaderController.get"
  },

]
