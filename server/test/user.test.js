process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
  // Clean up test_db after each test
  beforeEach((done) => {
    User.remove({}, (err) => {
      done()
    })
  })

  // TEST BLOCK: Get all
  describe('/GET users', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
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

  // TEST BLOCK: Post user
  describe('/POST user', () => {
    // Should not POST without all fields
    it('it should not POST a user without all fields', (done) => {
      const user = new User({
        name: 'John Johnsons'
      })

      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.have.property('body')
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.should.be.a('object')
          res.body.should.have.property('data')
          res.body.should.have.property('data').eql(null)
          done()
        })
    })

    // Should POST with all fields
    it('it should POST a user with all fields', (done) => {
      const user = new User({
        name: 'John Johnsons',
        password: 'dudesocks909',
        address: {
          street: '2800 E. Failroad',
          apt: '',
          city: 'Lamesville',
          state: 'Colorado',
          zip: '80433'
        }
      })

      chai.request(server)
        .post('/api/users')
        .send(user)
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

  // TESTS BLOCK: Get user
  describe('/GET/:user_id user', () => {
    it('it should GET a user given a valid user id', (done) => {
      const created = new Date()
      const user = new User({
        name: 'John Johnsons',
        password: 'dudesocks909',
        address: {
          street: '2800 E. Failroad',
          apt: '',
          city: 'Lamesville',
          state: 'Colorado',
          zip: '80433'
        },
        created: created,
        modified: created
      })

      user.save((err, user) => {
        chai.request(server)
          .get(`/api/users/${user._id}`)
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

  describe('/PUT/:user_id user', () => {
    it('it should PUT new user information given a valid id', (done) => {
      const created = new Date()
      const user = new User({
        name: 'John Johnsons',
        password: 'dudesocks909',
        address: {
          street: '2800 E. Failroad',
          apt: '',
          city: 'Lamesville',
          state: 'Colorado',
          zip: '80433'
        },
        created: created,
        modified: created
      })

      user.save((err, user) => {
        chai.request(server)
          .put(`/api/users/${user._id}`)
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

  describe('/DELETE/:user_id user', () => {
    it('it should DELETE a user given a valid id', (done) => {
      const created = new Date()
      const user = new User({
        name: 'John Johnsons',
        password: 'dudesocks909',
        address: {
          street: '2800 E. Failroad',
          apt: '',
          city: 'Lamesville',
          state: 'Colorado',
          zip: '80433'
        },
        created: created,
        modified: created
      })

      user.save((err, product) => {
        chai
          .request(server)
          .delete(`/api/users/${user._id}`)
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

  describe('GET/users/:userId/orders orders', () => {
    it(`it should GET a user's orders given a user's id`, (done) => {
      const product = new Product({
        name: 'Netgear Nighthawk x10',
        price: 449.95,
        category: 'Electronics',
        image: 'n/a'
      })
      product.setMetaDates()
      product.save((err, product) => {
        const order = new Order({
          products: [product._id]
        })
        order.setStatus()
        order.save((err, order) => {
          const user = new User({
            name: 'John Johnsons',
            password: 'dudesocks909',
            address: {
              street: '2800 E. Failroad',
              apt: '',
              city: 'Lamesville',
              state: 'Colorado',
              zip: '80433'
            },
            orders: [order._id]
          })
          user.setMetaDates()
          user.save((err, user) => {
            chai
              .request(server)
              .get(`/api/users/${user._id}/orders`)
              .end((err, res) => {
                res.should.have.status(200)
                res.should.have.property('body')
                res.body.should.be.a('array')
                res.body.length.should.eql(1)
                res.body[0].should.be.a('object')
                done()
              })
          })
        })
      })
    })
  })
})
