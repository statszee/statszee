'use strict'

const statsZee         = require("./");
const statsZeeInstance = new statsZee({
  osStats:  true,
  database: {
    stores: {
      database: {
        uri: process.env.DATABASE_URL
      }
    }
  }
})

statsZeeInstance.start().catch(statsZeeInstance.stop)
