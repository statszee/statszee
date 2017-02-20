'use strict'

const _ = require("lodash")

module.exports = class StatsZee {

  constructor(options) {
    this.appConfiguration = {
      pkg:    require('./package'),
      config: _.merge(require('./config'), options),
      api:    require('./api')
    }
    this.TrailsApp        = require('trails');
    this.server           = new this.TrailsApp(this.appConfiguration);
    this.app              = null
  }

  start() {
    return this.server.start().then((app) => {
      this.app = app
      if (this.appConfiguration.config.osStats == true) {
        this.osStats()
      }
      return Promise.resolve(app)
    }).catch(this.stop)
  }

  stop() {
    return this.server.stop()
  }

  osStats() {
    const os      = require('os');
    const cpuStat = require('cpu-stat');
    const app     = this.app;

    setInterval(function() {
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (!err) {
          Promise.all([
            app.services.LineProtocolWriterService.writePoint(
              app.services.LineProtocolService.toObject("machine.cpu.usage.percent", percent, null, "1m")
            ),
            app.services.LineProtocolWriterService.writePoint(
              app.services.LineProtocolService.toObject("machine.memory.free", os.freemem(), null, "1m")
            ),
            app.services.LineProtocolWriterService.writePoint(
              app.services.LineProtocolService.toObject("machine.memory.available", (os.totalmem() - os.freemem()), null, "1m")
            )
          ]).catch(error => {
            console.error(error)
          })
        }
      });
    }, 1000)

  }
}
