process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Product = require('../models/Product')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Products', () => {
  beforeEach(done => {
    Product.remove({}, err => {
      done()
    })
  })

  describe('/GET products', () => {
    it('it should GET all products', done => {
      chai.request(server).get('/api/products').end((err, res) => {
        res.should.have.status(200)
        res.body.data.should.be.a('array')
        res.body.data.length.should.be.eql(0)
        done()
      })
    })
  })

  describe('/POST product', () => {
    it('it should not POST a product without all fields', done => {
      const product = new Product({
        name: 'Netgear Nighthawk x10'
      })
      chai
        .request(server)
        .post('/api/products')
        .send(product)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.have.property('errors')
          res.body.should.have.property('data')
          res.body.should.have.property('data').eql(null)
          done()
        })
    })

    it('it should POST a product with dates and all fields', (done) => {
      const product = new Product({
        name: 'Netgear Nighthawk x10',
        price: 449.95,
        category: 'Electronics',
        image: 'n/a'
      })
      chai
        .request(server)
        .post('/api/products')
        .send(product)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.length.should.be.above(0)
          res.body.should.have.property('data')
          res.body.data.should.be.a('object')
          res.body.data.should.have.property('name')
          res.body.data.name.should.be.a('string')
          res.body.data.name.length.should.be.above(0)
          res.body.data.should.have.property('price')
          res.body.data.price.should.be.a('number')
          res.body.data.should.have.property('category')
          res.body.data.category.should.be.a('string')
          res.body.data.price.should.be.above(0)
          res.body.data.image.should.be.a('string')
          res.body.data.image.length.should.be.above(0)
          res.body.data.created.should.be.a('string')
          res.body.data.modified.should.be.a('string')
          done()
        })
    })
  })

  describe('/GET/:id product', () => {
    it('it should GET a product by the given id', done => {
      const created = new Date()
      const product = new Product({
        name: 'Netgear Nighthawk x10',
        price: 449.95,
        category: 'Electronics',
        image: 'n/a',
        created: created,
        modified: created
      })
      product.save((err, product) => {
        chai
          .request(server)
          .get(`/api/products/${product._id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.message.length.should.be.above(0)
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('name')
            res.body.data.name.should.be.a('string')
            res.body.data.name.length.should.be.above(0)
            res.body.data.should.have.property('price')
            res.body.data.price.should.be.a('number')
            res.body.data.should.have.property('category')
            res.body.data.category.should.be.a('string')
            res.body.data.should.have.property('image')
            res.body.data.image.should.be.a('string')
            res.body.data.image.length.should.be.above(0)
            res.body.data.created.should.be.a('string')
            res.body.data.created.should.be.a('string')
            done()
          })
      })
    })
  })

  describe('/PUT/:id product', () => {
    it('it should UPDATE a product given the id', done => {
      const created = new Date()
      const product = new Product({
        name: 'Netgear Nighthawk x10',
        price: 449.95,
        category: 'Electronics',
        image: 'n/a',
        created: created,
        modified: created
      })
      product.save((err, product) => {
        console.log('ERR', err)
        chai.request(server)
          .put(`/api/products/${product._id}`)
          .send({ name: 'Daffodill Dandy' })
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.message.length.should.be.above(0)
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('name')
            res.body.data.name.should.be.a('string')
            res.body.data.name.length.should.be.above(0)
            res.body.data.should.have.property('price')
            res.body.data.price.should.be.a('number')
            res.body.data.should.have.property('category')
            res.body.data.category.should.be.a('string')
            res.body.data.should.have.property('image')
            res.body.data.image.should.be.a('string')
            res.body.data.image.length.should.be.above(0)
            res.body.data.created.should.be.a('string')
            res.body.data.created.should.be.a('string')
            done()
          })
      })
    })
  })

  describe('/DELETE/:id product', () => {
    it('it should DELETE a product given the id', done => {
      const created = new Date()
      const product = new Product({
        name: 'Netgear Nighthawk x10',
        price: 449.95,
        category: 'Electronics',
        image: 'n/a',
        created: created,
        modified: created
      })
      product.save((err, product) => {
        chai
          .request(server)
          .delete(`/api/products/${product._id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.should.eql({})
            done()
          })
      })
    })
  })
})
