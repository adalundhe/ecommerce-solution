const Product = require('../../models/Product')


exports.getAll = (req, res) => {
    Product.find()
      .populate('reviews')
      .exec((err, products) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: 'Successfully retrieved all products!', data: products })
        }
      })
  }

exports.postOne = (req, res) => {
    const product = new Product()
    product.loadData(req.body)
    product.setMetaDates()
    product.save((err, product) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        Product.findById({_id: product})
          .populate('reviews')
          .exec((err, savedProduct) => {
            if (err) {
              res.json({ message: err, data: null })
            } else {
              res.json({ message: `Successfully created new product: ${savedProduct.name}`, data: product })
            }
          })
      }
    })
  }


exports.getOne = (req, res) => {
    const productId = req.params.product_id
    Product.findById({_id: productId})
      .populate('reviews')
      .exec((err, product) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: `Successfully updated product: ${product.name}`, data: product })
        }
      })
  }

  exports.putOne = (req, res) => {
    const productId = req.params.product_id
    Product.findById({_id: productId}, (err, product) => {
      product.loadData(req.body)
      product.setMetaDates()
      product.save((err, savedProduct) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          Product.findById({_id: productId})
            .populate('reviews')
            .exec((err, savedProduct) => {
              if (err) {
                res.json({ message: err, data: null })
              } else {
                res.json({ message: `Successfully updated product: ${product.name}`, data: savedProduct })
              }
            })
        }
      })
    })
  }

exports.deleteOne = (req, res) => {
  const productId = req.params.product_id
  Product.remove({ _id:  productId}, (err) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: 'Product successfully deleted.', data: {} })
      }
    })
  }


exports.addReview = (req, res) => {
  const productId = req.params.product_id
  Product.findById({_id: productId}, (err, product) => {
    if (err) {
      res.json({message: err, data: null})
    } else {

      product.addReview(req.body)
      product.save((err, product) => {
        if (err) {
          res.json({message: err, data: null})
        } else {
          Product.findById({_id: productId})
            .populate('reviews')
            .exec((err, product) => {
              if (err) {
                res.json({message: err, data: null})
              } else {
                res.json({message: 'Successfully added review.', data: product})
              }
            })
        }
      })
    }
  })
}


exports.removeReview = (req, res) => {
  const productId = req.params.product_id
  Product.findById({_id: productId}, (err, product) => {
    if (err) {
      res.json({message: err, data: null})
    } else {
      product.removeReview(req.body)
      product.save((err, product) => {
        if (err) {
          res.json({message: err, data: null})
        } else {
          res.json({message: 'Review successfully deleted', data: product})
        }
      })
    }
  })
}
