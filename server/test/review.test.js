process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Review = require('../models/Review')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

describe('Reviews', () => {
  beforeEach((done) => {
    Review.remove({}, (err) => {
      done()
    })
  })

  // TEST BLOCK: Get all
  describe('/GET reviews', () => {
    it('it should GET all reviews', (done) => {
      chai.request(server)
        .get('/api/reviews')
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

  // TEST BLOCK: Post review
  describe('/POST review', () => {
    // Should not POST without all fields
    it('it should not POST a review without all fields', (done) => {
      const review = new Review({
        rating: 3
      })

      chai.request(server)
        .post('/api/reviews')
        .send(review)
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
    it('it should POST a review with all fields', (done) => {
      const review = new Review({
        rating: 4,
        comment: 'This works!'
      })

      chai.request(server)
        .post('/api/reviews')
        .send(review)
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

  // TESTS BLOCK: Get review
  describe('/GET/:review_id review', () => {
    it('it should GET a review given a valid review id', (done) => {
      const created = new Date()
      const review = new Review({
        rating: 4,
        comment: 'This works!',
        created: created,
        modified: created
      })

      review.save((err, review) => {
        chai.request(server)
          .get(`/api/reviews/${review._id}`)
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

  describe('/PUT/:review_id review', () => {
    it('it should PUT new review information given a valid id', (done) => {
      const created = new Date()
      const review = new Review({
        rating: 3,
        comment: 'This works!',
        created: created,
        modified: created
      })
      review.save((err, review) => {
        chai.request(server)
          .put(`/api/reviews/${review._id}`)
          .send({ rating: 4 })
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

  describe('/DELETE/:review_id review', () => {
    it('it should DELETE a review given a valid id', (done) => {
      const created = new Date()
      const review = new Review({
        rating: 3,
        comment: 'This works!',
        created: created,
        modified: created
      })

      review.save((err, product) => {
        chai.request(server)
          .delete(`/api/reviews/${review._id}`)
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
