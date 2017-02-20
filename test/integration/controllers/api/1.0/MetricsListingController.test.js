'use strict'

const Chai   = require("chai")
const should = Chai.should()
const expect = Chai.expect;
const Moment = require("moment")

const Supertest = require("supertest");

const LineProtocolHelper = require("../../../../libs/LineProtocolHelper")
const DatabaseUtil       = require("../../../../libs/DatabaseUtil")

describe('MetricsListingController', () => {
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
      should.exist(global.app.controllers.MetricsListingController)
    })
    it("should respond to get method", () => {
      expect(global.app.controllers.MetricsListingController).to.respondTo("get")
    })
  })

  describe("empty array return", () => {
    it("should return an array of 0 element", (done) => {
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(0)
          done(err)
        })
    })
  })

  describe("data array return", () => {
    let point = LineProtocolHelper.randomPoint(true)

    before((done) => {
      DatabaseUtil.insertStat(LineProtocolHelper.objToString(point)).then(done).catch(done)
    })

    after((done) => {
      DatabaseUtil.deleteAll().then(done).catch(done)
    })

    it("should return an array of 1 element with name", (done) => {
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(1)
          res.body[0].namespace.should.be.equal(point.namespace)
          res.body[0].precision.should.be.equal(point.timeUnit)
          done(err)
        })
    })
  })

  describe("return only stat namespace not stat points", () => {
    let point = LineProtocolHelper.randomPoint(true)

    before((done) => {
      Promise.all([
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point)),
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point))
      ]).then(() => {
        done(null)
      }).catch(done)
    })

    after((done) => {
      DatabaseUtil.deleteAll().then(done).catch(done)
    })

    it("should return an array of 1 element with name", (done) => {
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(1)
          res.body[0].namespace.should.be.equal(point.namespace)
          res.body[0].precision.should.be.equal(point.timeUnit)
          done(err)
        })
    })
  })

  describe("can be queried", () => {
    let point1 = LineProtocolHelper.point({namespace: "statszee.key.value"}, true)
    let point2 = LineProtocolHelper.point({namespace: "statszee.key.another"}, true)
    let point3 = LineProtocolHelper.point({namespace: "statszee.another-key.value"}, true)
    let point4 = LineProtocolHelper.point({namespace: "test.object.value"}, true)
    let point5 = LineProtocolHelper.point({namespace: "test.params.value"}, true)

    before((done) => {
      Promise.all([
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point1)),
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point2)),
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point3)),
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point4)),
        DatabaseUtil.insertStat(LineProtocolHelper.objToString(point5)),
      ]).then(() => {
        done(null)
      }).catch(done)
    })

    after((done) => {
      DatabaseUtil.deleteAll().then(done).catch(done)
    })

    it("should honor query parameter", (done) => {
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .query({query: "statszee.*"})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(3)
          done(err)
        })
    })

    it("should encapsule string in jolly if no jolly is provided", (done)=>{
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .query({query: "key.value"})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(2)
          done(err)
        })
    })

    it("should honor query parameter with partial jolly", (done) => {
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .query({query: "statszee.*.value"})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(2)
          done(err)
        })
    })

    it("should honor query parameter with a starting jolly", (done) => {
      request
        .get("/api/metrics")
        .set("Accept", "application/json")
        .query({query: "*.key.value"})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(1)
          done(err)
        })
    })
  })

})
