const Order = require('../../models/Order')


exports.getAll = (req, res) => {
    Order.find()
      .populate('products')
      .populate('user')
      .exec((err, orders) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: 'Got all orders', data: orders })
        }
      })
  }

  exports.postOne = (req, res) => {
    const order = new Order()
    order.setData(req.body)
    order.setMetaDates()
    order.save((err, order) => {
      console.log('Putting',err, order)
      if (err) {
        res.json({message: err, data: null})
      } else {
        Order.findById(order._id)
        .populate('products')
        .populate('user')
        .exec((err, order) => {
          if (err) {
            res.json({ message: err, data: null })
          } else {
            res.json({ message: `Created new order.`, data: order })
          }
        })
      }
    })
  }


exports.getOne = (req, res) => {
    const orderId = req.params.order_id
    Order.findById({_id: orderId})
      .populate('products')
      .populate('user')
      .exec((err, order) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: `Updated order: ${order.comment}`, data: order })
        }
      })
    }

exports.putOne = (req, res) => {
    const orderId = req.params.order_id
    Order.findById({_id: orderId}, (err, order) => {
      order.setData(req.body)
      order.save((err, order) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          Order.findById({_id: orderId})
            .populate('products')
            .populate('user')
            .exec((err, order) => {
              if (err) {
                res.json({message: err, data: null})
              } else {
                res.json({msg: 'Updated order.', data: order})
              }
            })
        }
      })
    })
  }

exports.deleteOne = (req, res) => {
    Order.remove({_id: req.params.order_id}, (err) => {
      if (err) {
        res.json({ message: err, data: null})
      } else {
        res.json({ message: `Successfully deleted order.`, data: {} })
      }
    })
  }


exports.getUserOrders = (req, res) => {
  const userId = req.params.user_id
  Order.find({user: userId})
    .populate('products')
    .populate('user')
    .exec((err, orders) => {
      if (err) {
        res.json({message: err, data: null})
      } else {
        res.json({message: 'Found user orders.', data: orders})
      }
    })
}