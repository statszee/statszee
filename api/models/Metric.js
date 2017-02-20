'use strict'

const Model = require('trails/model')

/**
 * @module Metric
 * @description TODO document Model
 */
module.exports = class Metric extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        classMethods: {
          associate: models => {
            // models.Metric.hasMany(models.Stat, {foreignKey: "metric"})
          }
        }
      }
    }
  }

  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      namespace: {
        type:      Sequelize.STRING,           // eslint-disable-line
        index: true,
        unique: 'metric_definition',
        allowNull: false,
      },
      precision: {
        type:      Sequelize.STRING,           // eslint-disable-line
        index: true,
        unique: 'metric_definition',
        allowNull: false
      },
      firstData: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    }
  }
}
