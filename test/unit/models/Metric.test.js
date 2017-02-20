'use strict'

const Chai   = require('chai')
const should = Chai.should()

describe('Metric Model', () => {
  it('should exist', () => {
    should.exist(global.app.orm.Metric)
  })

  describe("namespace field", () => {
    it("should exist", () => {
      should.exist(global.app.orm.Metric.attributes.namespace)
    })
    it("index should be true", () => {
      global.app.orm.Metric.attributes.namespace.index.should.be.equal(true)
    })
    it("unique should be 'metric_definition'", () => {
      global.app.orm.Metric.attributes.namespace.unique.should.be.equal('metric_definition')
    })
    it("allowNull should be false", () => {
      global.app.orm.Metric.attributes.namespace.allowNull.should.be.equal(false)
    })
  })

  describe("precision field", () => {
    it("should exist", () => {
      should.exist(global.app.orm.Metric.attributes.precision)
    })
    it("index should be true", () => {
      global.app.orm.Metric.attributes.precision.index.should.be.equal(true)
    })
    it("unique should be 'metric_definition'", () => {
      global.app.orm.Metric.attributes.precision.unique.should.be.equal('metric_definition')
    })
    it("allowNull should be false", () => {
      global.app.orm.Metric.attributes.precision.allowNull.should.be.equal(false)
    })
  })
})
