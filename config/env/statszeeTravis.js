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
        port: '5432',
        database: 'travis_ci_test',
        username: "postgres",
        password: "",
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
