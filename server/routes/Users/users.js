const User = require('../../models/User')

exports.getAll = (req, res) => {
  User.find()
    .populate('cart')
    .populate('orders')
    .populate('reviews')
    .exec((err, users) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: 'Successfully retrieved all users.', data: users })
      }
    })
}

exports.postOne = (req, res) => {
  const user = new User()
  user.loadData(req.body)
  user.setPrivlidges(req.body.isAdmin)
  user.setMetaDates()
  user.save((err, user) => {
    if (err) {
      res.json({message: err, data: null})
    } else {
      User.findById({_id: user._id})
        .populate('cart')
        .populate('orders')
        .populate('reviews')
        .exec((err, user) => {
          if (err) {
            res.json({message: err, data: null})
          } else {
            res.json({message: 'Successfully created user.', data: user})
          }
        })
    }
  })
}

exports.getOne = (req, res) => {
  const userId = req.params.user_id
  User.findById({_id: userId})
    .populate('cart')
    .populate('orders')
    .populate('reviews')
    .exec((err, user) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: `Found user: ${user.name}`, data: user })
      }
    })
}

exports.putOne = (req, res) => {

  const userId = req.params.user_id
  User.findById({_id: userId}, (err, user) => {
    user.loadData(req.body)
    user.setMetaDates()
    user.save((err, user) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        User.findById({_id: userId})
          .populate('cart')
          .populate('orders')
          .populate('reviews')
          .exec((err, user) => {
            if (err) {
              res.json({ message: err, data: null })
            } else {
              res.json({ message: `Updated user: ${user.name}`, data: user })
            }
          })
      }
    })
  })
}

exports.removeFromCart = (req, res) => {
  const userId = req.params.user_id
  User.findById({_id: userId}, (err, user) => {
    user.removeFromCart(req.body._id)
    user.save((err, user) => {
      if (err)  {
        res.json({message: err, data: null})
      } else {
        User.findById({_id: userId})
          .populate('cart')
          .exec((err, user) => {
            if (err) {
              res.json({message: err, data: null})
            } else {
              res.json({msg: 'Updated cart', data: user.cart})
            }
          })
      }
    })
  })
}

exports.addToCart = (req, res) => {
  const userId = req.params.user_id
  User.findById({_id: userId}, (err, user) => {
    user.addToCart(req.body._id)
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

exports.deleteOne = (req, res) => {
  const userId = req.params.user_id
  User.remove({_id: userId}, (err) => {
    if (err) {
      res.json({message: err, data: null})
    } else {
      res.json({message: 'User successfully deleted.', data: {}})
    }
  })
}

exports.setPrivlidges = (req, res) => {
  const userId = req.params.userId
  User.findById({_id: userId}, (err, user) => {
    if (err) {
      res.json({message: err, data: null})
    }

    if (!user.isAdmin) {
      res.json({message: 'Error: You do not have permission to change user privlidges.', data: null})
    } else {
      user.setPrivlidges(req.body)
      user.save((err, user) => {
        if (err) {
          res.json({message: err, data: null})
        } else {
          User.findById({_id: userId})
            .populate('cart')
            .populate('orders')
            .populate('reviews')
            .exec((err, user) => {
              if (err) {
                res.json({message: err, data: null})
              } else {
                res.json({message: 'Successfully changed user permissions', data: user})
              }
            })
        }
      })
    }

  })
}
