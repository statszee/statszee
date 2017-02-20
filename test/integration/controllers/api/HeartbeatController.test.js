'use strict'
/* global describe, it */

const Chai   = require('chai')
const expect = Chai.expect

const supertest = require('supertest')

describe('HeartbeatController', () => {
  let request

  before((done) => {
    request = supertest('http://localhost:8567')
    done()
  })

  it('should provide a response calling heartbeat endpoint', (done) => {
    request
      .get('/heartbeat')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.a('object')
        expect(res.body.app).to.be.a('object')
        expect(res.body.server).to.be.a('object')
        done(err)
      })
  })
})
