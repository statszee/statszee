'use strict'
const supertest = require('supertest')
const request   = supertest('http://localhost:8567')

module.exports = class DatabaseUtil {
  static deleteAll() {
    return new Promise((fullfill, reject) => {
      Promise.all([
        global.app.orm.Stat.truncate({cascade: true, force: true}),
        global.app.orm.Metric.truncate({cascade: true, force: true})
      ])
        .then(() => {
          fullfill()
        })
        .catch(reject)
    })
  }

  static countStat() {
    return new Promise((fullfill, reject) => {
      global.app.orm.Stat.count()
        .then(count => {
          fullfill(count)
        })
        .catch(reject)
    })
  }

  // TODO: refactor to APIUtil
  static insertStat(stat) {
    return new Promise((fullfill, reject) => {
      request
        .post('/api/write')
        .type('text')
        .send(stat)
        .expect(204)
        .end((err, res) => {
          if (err) reject(err)
          else fullfill(null)
        })
    })
  }
}
