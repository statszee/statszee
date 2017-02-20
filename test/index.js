'use strict'

const statsZee         = require("../");
const statsZeeInstance = new statsZee({})

before(done => {
  global.app = statsZeeInstance

  statsZeeInstance
    .start()
    .then((app) => {
      global.app = app
      done()
    }).catch(statsZeeInstance.stop)
})

after(() => {
  global.app.stop()
})
