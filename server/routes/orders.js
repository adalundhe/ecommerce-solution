const express = require('express')
const Router = express.Router()
const Order = require('../models/Order')

Router.route('/')
  .get((req, res) => {
    Order.find()
      .populate('products')
      .exec((err, orders) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: 'Got all orders', data: orders })
        }
      })
  })
  .post((req, res) => {
    const order = new Order()
    order.setStatus(req.body)
    order.save((err, order) => {
      Order.findById(order._id)
        .populate('products')
        .exec((err, order) => {
          if (err) {
            res.json({ message: err, data: null })
          } else {
            res.json({ message: `Created new order.`, data: order })
          }
        })
    })
  })

Router.route('/:order_id')
  .get((req, res) => {
    Order.findById(req.params.order_id, (err, order) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: `Updated order: ${order.comment}`, data: order })
      }
    })
  })
  .put((req, res) => {
    Order.findById(req.params.order_id, (err, order) => {
      order.rating = req.body.rating ? req.body.rating : order.rating
      order.comment = req.body.comment ? req.body.comment : order.comment
      order.dateModified = new Date()

      order.save((err, order) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: `Updated order: ${order.comment}`, data: order })
        }
      })
    })
  })
  .delete((req, res) => {
    Order.remove({_id: req.params.order_id}, (err) => {
      if (err) {
        res.json({ message: err, data: null})
      } else {
        res.json({ message: `Successfully deleted order.`, data: {} })
      }
    })
  })

module.exports = Router
