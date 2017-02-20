'use strict'

const Chai   = require('chai')
const should = Chai.should()

describe('Stat Model', () => {
  it('should exist', () => {
    should.exist(global.app.api.models.Stat)
  })

  describe('metric field',()=>{
    it("should exist",()=>{
      should.exist(global.app.orm.Stat.attributes.metric)
    })
  })

  describe('datetime field', () => {
    it('should exist', () => {
      should.exist(global.app.orm.Stat.attributes.datetime)
    })
    it('allowNull should be false', () => {
      global.app.orm.Stat.attributes.datetime.allowNull.should.be.equal(false)
    })
    it('index should be true', () => {
      global.app.orm.Stat.attributes.datetime.index.should.be.equal(true)
    })
  })

  describe('count field', () => {
    it('should exist', () => {
      should.exist(global.app.orm.Stat.attributes.count)
    })
    it('defaultValue should be 1', () => {
      global.app.orm.Stat.attributes.count.defaultValue.should.be.equal(1)
    })
  })

  describe('sum field', () => {
    it('should exist', () => {
      should.exist(global.app.orm.Stat.attributes.sum)
    })
    it('defaultValue should be 0', () => {
      global.app.orm.Stat.attributes.sum.defaultValue.should.be.equal(0)
    })
  })

  describe('min field', () => {
    it('should exist', () => {
      should.exist(global.app.orm.Stat.attributes.min)
    })
    it('defaultValue should be 0', () => {
      global.app.orm.Stat.attributes.min.defaultValue.should.be.equal(0)
    })
  })

  describe('max field', () => {
    it('should exist', () => {
      should.exist(global.app.orm.Stat.attributes.max)
    })
    it('defaultValue should be 0', () => {
      global.app.orm.Stat.attributes.max.defaultValue.should.be.equal(0)
    })
  })

  describe('avg field', () => {
    it('should exist', () => {
      should.exist(global.app.orm.Stat.attributes.avg)
    })
    it('defaultValue should be 0', () => {
      global.app.orm.Stat.attributes.avg.defaultValue.should.be.equal(0)
    })
  })
})
