/**
 * @module server
 *
 * Start up the Trails Application.
 */

'use strict'

const app       = require('./')
const TrailsApp = require('trails')
const server    = new TrailsApp(app)

server.start().then((app) => {}).catch(err => server.stop(err))
