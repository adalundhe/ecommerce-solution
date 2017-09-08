const User = require('../../models/User')

exports.getAll = (req, res) => {
  User.find()
    .populate('cart')
    .exec((err, users) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: 'Successfully retrieved all users.', data: users })
      }
    })
}

exports.getOne = (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.json({ message: err, data: null })
    } else {
      res.json({ message: `Found user: ${user.name}`, data: user })
    }
  })
}

exports.editOne = (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    user.loadData(req.body)
    user.setMetaDates()
    user.save((err, user) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: `Updated user: ${user.name}`, data: user })
      }
    })
  })
}

exports.removeOne = (req, res) => {
  User.findById({_id: req.params.user_id}, (err) => {
    if (err) {
      res.json({ message: err, data: null })
    } else {
      res.json({ message: `Successfully deleted project.`, data: {} })
    }
  })
}

exports.addToCart = (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    user.addToCart(req.body.product_id)
    user.save((err, user) => {
      User.findById(user._id)
        .populate('cart')
        .exec((err, user) => {
          if (err) {
            res.json({ message: err, data: null })
          } else {
            res.json({ message: `Updated cart`, data: user.cart })
          }
        })
    })
  })
}

exports.removeFromCart = (req, res) => {
  user.removeFromCart(req.body.product_id)
  user.save((err, user) => {
    User.findById(user._id)
      .populate('cart')
      .exec((err, user) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: `Updated cart`, data: user.cart })
        }
      })
  })
}
