/**
 * Database Configuration
 * (app.config.database)
 *
 * Configure the ORM layer, connections, etc.
 *
 * @see {@link http://trailsjs.io/doc/config/database}
 */
module.exports = {

  stores: {
    database: {
      host: '',
      port: '',
      database: '',
      dialect: 'postgresql',
      logging: false
    }
  },

  models: {
    defaultStore: 'database',
    migrate: 'alter'
  }
}
