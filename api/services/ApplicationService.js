'use strict'

const Service = require('trails/service')

/**
 * @module ApplicationService
 * @description TODO document Service
 */
module.exports = class ApplicationService extends Service {
  getApplicationInfo() {
    const trailpacks = []
    Object.keys(this.app.packs).forEach(packName => {
      if (packName != 'inspect') {
        const pack = this.app.packs[packName]
        trailpacks.push({
          name: pack.name,
          version: pack.pkg.version
        })
      }
    })
    return {
      app: this.app.pkg.version,
      node: process.version,
      libs: process.versions,
      trailpacks: trailpacks
    }
  }
}

