'use strict'

const Model = require('trails/model')

/**
 * @module Stat
 * @description TODO document Model
 */
module.exports = class Stat extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        timestamps: false,
        classMethods: {
          associate: models => {
            // models.Stat.belongsTo(models.Metric, {foreignKey: "metric"})
          }
        }
      }
    }
  }

  static schema(app, Sequelize) {
    return {
      metric: {
        type: Sequelize.BIGINT,
        index: true,
        unique: 'stats_definition',
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'metric',
          key: 'id'
        }
      },
      datetime: {
        type:       Sequelize.DATE,             // eslint-disable-line
        index: true,
        unique: 'stats_definition',
        primaryKey: true,
        allowNull: false
      },
      count: {
        type:         Sequelize.BIGINT,           // eslint-disable-line
        defaultValue: 1
      },
      sum: {
        type:         Sequelize.DECIMAL(32, 4),   // eslint-disable-line
        defaultValue: 0
      },
      min: {
        type:         Sequelize.DECIMAL(32, 4),   // eslint-disable-line
        defaultValue: 0
      },
      max: {
        type:         Sequelize.DECIMAL(32, 4),   // eslint-disable-line
        defaultValue: 0
      },
      avg: {
        type:         Sequelize.DECIMAL(32, 4),   // eslint-disable-line
        defaultValue: 0
      }

    }
  }
}
