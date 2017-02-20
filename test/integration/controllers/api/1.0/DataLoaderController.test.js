'use strict'

const Chai   = require("chai")
const should = Chai.should()
const expect = Chai.expect;
const Moment = require("moment")

const Supertest = require("supertest");

const LineProtocolHelper = require("../../../../libs/LineProtocolHelper")
const DatabaseUtil       = require("../../../../libs/DatabaseUtil")

describe('DataLoaderController', () => {
  let request;

  before((done) => {
    request = Supertest('http://localhost:8567')
    done()
  })

  after((done) => {
    DatabaseUtil.deleteAll().then(done).catch(done)
  })

  describe("class & methods", () => {
    it('should exist', () => {
      should.exist(global.app.api.controllers.DataLoaderController)
    })
    it("write should exist", () => {
      expect(global.app.api.controllers.DataLoaderController).to.respondTo("write")
    })
  })

  describe("line validation", () => {
    it("should return 422 with invalid row", (done) => {
      request
        .post("/api/write")
        .type("text")
        .send("sdk.key.connection1 " + Moment().format("X") + "|1d")
        .expect(422, done)
    })
    it("should return 422 with no row", (done) => {
      request
        .post("/api/write")
        .type("text")
        .send("")
        .expect(422, done)
    })
    it("should return 204 with valid row", (done) => {
      request
        .post("/api/write")
        .type("text")
        .send(LineProtocolHelper.randomPoint())
        // .set("Content-Type", "text/plain")
        .expect(204, done)
    })
  })

  describe("db writing", () => {
    beforeEach(done => {
      DatabaseUtil.deleteAll().then(done).catch(done)
    })

    it("should write the point on db", (done) => {
      request
        .post("/api/write")
        .type("text")
        .send(LineProtocolHelper.randomPoint())
        .expect(204)
        .end((err, res) => {
          DatabaseUtil.countStat()
            .then(count => {
              count.should.be.equal(1)
              done()
            })
            .catch(done)
        })
    })
    it("two point with same aggregation should write one point on db", (done) => {
      let data = LineProtocolHelper.randomPoint();
      request
        .post("/api/write")
        .type("text")
        .send(data + "\n" + data)
        .expect(204)
        .end((err, res) => {
          DatabaseUtil.countStat()
            .then(count => {
              count.should.be.equal(1)
              done()
            })
            .catch(done)
        })
    })
    it("two point with different aggregation should write two point on db", (done) => {
      request
        .post("/api/write")
        .type("text")
        .send(LineProtocolHelper.randomPoint() + "\n" + LineProtocolHelper.randomPoint())
        .expect(204)
        .end((err, res) => {
          DatabaseUtil.countStat()
            .then(count => {
              count.should.be.equal(2)
              done()
            })
            .catch(done)
        })
    })
  })
})
