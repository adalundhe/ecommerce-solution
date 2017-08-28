process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Orders', () => {
  // Clean up test_db after each test
  beforeEach((done) => {
    Order.remove({}, (err) => {
      done()
    })
  })

  // TEST BLOCK: Get all
  describe('/GET orders', () => {
    it('it should GET all orders', (done) => {
      chai.request(server)
        .get('/api/orders')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.have.property('body')
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.length.should.be.above(0)
          res.body.should.have.property('data')
          res.body.data.should.be.a('array')
          done()
        })
    })
  })

  // TEST BLOCK: Post order
  describe('/POST order', () => {
    // Should not POST without all fields
    it('it should not POST a order without all fields', (done) => {
      const order = new Order({
      })

      chai.request(server)
        .post('/api/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.have.property('body')
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.should.have.property('data')
          done()
        })
    })

    // Should POST with all fields
    it('it should POST a order with all fields', (done) => {
      const created = new Date()
      const testProduct = {
        name: 'Netgear Nighthawk x10',
        price: 449.95,
        image: 'n/a',
        created: created,
        modified: created
      }

      const testUser = {
        name: 'John Johnsons',
        password: 'dudesocks909',
        address: {
          street: '2800 E. Failroad',
          apt: '',
          city: 'Lamesville',
          state: 'Colorado',
          zip: '80433'
        }
      }

      const order = {
        products: [testProduct],
        user: testUser
      }

      chai.request(server)
        .post('/api/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.have.property('body')
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.length.should.be.above(0)
          res.body.should.have.property('data')
          res.body.data.should.be.a('object')
          done()
        })
    })
  })

  // TESTS BLOCK: Get order
  describe('/GET/:order_id order', () => {
    it('it should GET a order given a valid order id', (done) => {
      const order = new Order({
        total: 10.00,
        status: 2
      })

      order.save((err, order) => {
        chai.request(server)
          .get(`/api/orders/${order._id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.should.have.property('body')
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.message.length.should.be.above(0)
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            done()
          })
      })
    })
  })

  describe('/PUT/:order_id order', () => {
    it('it should PUT new order information given a valid id', (done) => {
      const order = new Order({
        total: 10.00,
        status: 2
      })

      order.save((err, order) => {
        chai.request(server)
          .put(`/api/orders/${order._id}`)
          .send({ name: 'Collin Farrell' })
          .end((err, res) => {
            res.should.have.status(200)
            res.should.have.property('body')
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.message.length.should.be.above(0)
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            done()
          })
      })
    })
  })

  describe('/DELETE/:order_id order', () => {
    it('it should DELETE a order given a valid id', (done) => {
      const order = new Order({
        total: 10.00,
        status: 2
      })

      order.save((err, product) => {
        chai
          .request(server)
          .delete(`/api/orders/${order._id}`)
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
