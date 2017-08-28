const express = require('express')
const Router = express.Router()
const User = require('../models/User')

Router.route('/')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: 'Successfully retrieved all users.', data: users }) }
    })
  })
  .post((req, res) => {
    const user = new User()
    user.loadData(req.body)
    user.setMetaDates()
    user.save((err, user) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `User: ${user.name} successfully created`, data: user }) }
    })
  })

Router.route('/:userId/orders')
  .get((req, res) => {
    User.findById(req.params.userId)
      .populate('orders')
      .exec((err, user) => {
        if (err) {
          res.status(500)
        } else {
          res.status(200)
          res.json(user.orders)
        }
      })
  })

Router.route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `Found user: ${user.name}`, data: user }) }
    })
  })
  .put((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      user.loadData(req.body)
      user.setMetaDates()
      user.save((err, user) => {
        if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `Updated user: ${user.name}`, data: user }) }
      })
    })
  })
  .delete((req, res) => {
    User.findById({_id: req.params.userId}, (err) => {
      if (err) { res.json({ message: err, data: null }) } else { res.json({ message: `Successfully deleted project.`, data: {} }) }
    })
  })

module.exports = Router
