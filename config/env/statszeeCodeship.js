'use strict'

const smokesignals = require('smokesignals')

module.exports = {

  trailpack: {
    disabled: [
      'repl'
    ]
  },

  log: {
    logger: new smokesignals.Logger('error')
  },

  database: {
    stores: {
      database: {
        host: '127.0.0.1',
        port: '5435',
        database: 'test',
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        dialect: 'postgresql',
        logging: false
      }
    },

    models: {
      migrate: 'drop'
    }
  },

  web: {
    port: 8567
  }
}
