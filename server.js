'use strict'

const database     = process.env.DATABASE_URL;
const databaseData = database.match(/(postgres:\/\/)([^:]+):([^@]+)@([^@]+):([0-9]+)\/(.+)/i)

const statsZee         = require("./");
const statsZeeInstance = new statsZee({
  osStats:  true,
  database: {
    stores: {
      database: {
        host:     databaseData[4],
        port:     databaseData[5],
        database: databaseData[6],
        username: databaseData[2],
        password: databaseData[3],
        native: true,
        ssl: true
      }
    }
  }
})

statsZeeInstance.start().catch(statsZeeInstance.stop)
