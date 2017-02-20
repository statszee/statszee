'use strict'

const Chai   = require("chai")
const should = Chai.should()
const expect = Chai.expect;
const Moment = require("moment")

const Supertest = require("supertest");

const LineProtocolHelper = require("../../../../libs/LineProtocolHelper")
const DatabaseUtil       = require("../../../../libs/DatabaseUtil")


describe('StatsReaderController', () => {
  let request;

  before((done) => {
    request = Supertest('http://localhost:8567')
    done()
  })

  after((done) => {
    DatabaseUtil.deleteAll().then(done).catch(done)
  })

  describe("class & methods", () => {
    it("should exist", () => {
      should.exist(global.app.controllers.StatsReaderController)
    })
    it("should responde to get", () => {
      expect(global.app.controllers.StatsReaderController).to.respondTo("get")
    })
  })

  describe("data gathering", () => {
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

    it("should return a single point with datetime,count,sum,min,max,avg", (done) => {
      request
        .get("/api/read/" + point.namespace + "/" + point.timeUnit)
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(1)
          res.body[0].should.be.a("array")
          res.body[0].length.should.be.equal(6)
          done(err)
        })
    })
  })

  describe("data gathering for missing timeunit", () => {
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

    it("should return a blank array", (done) => {
      request
        .get("/api/read/" + point.namespace + "/9y")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(0)
          done(err)
        })
    })
  })

  describe("data gathering for missing metric", () => {
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

    it("should return a blank array", (done) => {
      request
        .get("/api/read/unknown-metric/9y")
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(0)
          done(err)
        })
    })
  })

  describe("data gathering with data range", () => {
    let point1 = LineProtocolHelper.point({
      namespace: "test-1",
      value:     1,
      timestamp: Moment("01-02-2017", "DD-MM-YYYY"),
      timeUnit:  "1d"
    })
    let point2 = LineProtocolHelper.point({
      namespace: "test-1",
      value:     1,
      timestamp: Moment("02-02-2017", "DD-MM-YYYY"),
      timeUnit:  "1d"
    })
    let point3 = LineProtocolHelper.point({
      namespace: "test-1",
      value:     1,
      timestamp: Moment("03-02-2017", "DD-MM-YYYY"),
      timeUnit:  "1d"
    })

    before((done) => {
      Promise.all([
        DatabaseUtil.insertStat(point1),
        DatabaseUtil.insertStat(point2),
        DatabaseUtil.insertStat(point3)
      ])
        .then(() => {
          done(null)
        })
        .catch(done)
    })

    after((done) => {
      DatabaseUtil.deleteAll().then(done).catch(done)
    })

    it("should return blank array with not in range future date", (done) => {
      request
        .get("/api/read/test-1/1d")
        .set("Accept", "application/json")
        .query({start: Moment("01-03-2017", "DD-MM-YYYY").startOf("day").format("x")})
        .query({end: Moment("03-03-2017", "DD-MM-YYYY").endOf("day").format("x")})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(0)
          done(err)
        })
    })
    it("should return blank array with not in range past date", (done) => {
      request
        .get("/api/read/test-1/1d")
        .set("Accept", "application/json")
        .query({start: Moment("01-01-2017", "DD-MM-YYYY").startOf("day").format("x")})
        .query({end: Moment("03-01-2017", "DD-MM-YYYY").endOf("day").format("x")})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(0)
          done(err)
        })
    })
    it("should return 3 element with full covering range", (done) => {
      request
        .get("/api/read/test-1/1d")
        .set("Accept", "application/json")
        .query({start: Moment("01-02-2017", "DD-MM-YYYY").startOf("day").format("x")})
        .query({end: Moment("03-02-2017", "DD-MM-YYYY").endOf("day").format("x")})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(3)
          done(err)
        })
    })
    it("should return 2 element with half covering range", (done) => {
      request
        .get("/api/read/test-1/1d")
        .set("Accept", "application/json")
        .query({start: Moment("01-02-2017", "DD-MM-YYYY").startOf("day").format("x")})
        .query({end: Moment("02-02-2017", "DD-MM-YYYY").endOf("day").format("x")})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(2)
          done(err)
        })
    })
    it("should return 2 element with half covering start only rate", (done) => {
      request
        .get("/api/read/test-1/1d")
        .set("Accept", "application/json")
        .query({start: Moment("02-02-2017", "DD-MM-YYYY").startOf("day").format("x")})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(2)
          done(err)
        })
    })
    it("should return 2 element with half covering end only rate", (done) => {
      request
        .get("/api/read/test-1/1d")
        .set("Accept", "application/json")
        .query({end: Moment("02-02-2017", "DD-MM-YYYY").endOf("day").format("x")})
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array")
          res.body.length.should.be.equal(2)
          done(err)
        })
    })

  })
})
