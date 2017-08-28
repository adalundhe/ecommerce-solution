const express = require('express')
const Router = express.Router()
const Review = require('../models/Review')

Router.route('/')
  .get((req, res) => {
    Review.find((err, reviews) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: 'Got all reviews', data: reviews }) }
    })
  })
  .post((req, res) => {
    const review = new Review()
    review.loadData(req.body)
    review.setMetaDates()
    review.save((err, review) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `Created new review: ${review.comment}`, data: review }) }
    })
  })

Router.route('/:review_id')
  .get((req, res) => {
    Review.findById(req.params.review_id, (err, review) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `Updated review: ${review.comment}`, data: review }) }
    })
  })
  .put((req, res) => {
    Review.findById(req.params.review_id, (err, review) => {
      review.loadData(req.body)
      review.setMetaDates()
      review.save((err, review) => {
        if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `Updated review: ${review.comment}`, data: review }) }
      })
    })
  })
  .delete((req, res) => {
    Review.remove({_id: req.params.review_id}, (err) => {
      if (err) { res.json({ message: err, data: null}) } else { res.json({ message: `Successfully deleted review.`, data: {} }) }
    })
  })

module.exports = Router
