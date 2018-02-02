const Review = require('../../models/Review')


exports.getAll = (req, res) => {
    Review.find()
      .populate('user')
      .populate('product')
      .exec((err, reviews) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: 'Got all reviews', data: reviews })
        }
      })
  }

exports.postOne = (req, res) => {
    const review = new Review()
    review.loadData(req.body)
    review.setMetaDates()
    review.save((err, review) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        Review.findById({_id: review._id})
          .populate('user')
          .populate('product')
          .exec((err, review) => {
            if (err) {
              res.json({msssage: err, data: null})
            } else {
              res.json({ message: `Created new review: ${review.comment}`, data: review })
            }
          })
      }
    })
  }

exports.getOne = (req, res) => {
    const reviewId = req.params.review_id
    Review.findById({_id: reviewId})
      .populate('user')
      .populate('product')
      .exec((err, review) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: `Updated review: ${review.comment}`, data: review })
        }
      })
  }

exports.putOne = (req, res) => {
    const reviewId = req.params.review_id
    console.log('BODY',req.body)
    Review.findById({_id: reviewId}, (err, review) => {
      console.log('EDITING:',review)
      review.loadData(req.body)
      review.setMetaDates()
      review.save((err, review) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          Review.findById({_id: reviewId})
            .populate('user')
            .populate('product')
            .exec((err, review) => {
              if (err) {
                res.json({ message: err, data: null })
              } else {
                res.json({ message: `Updated review: ${review.comment}`, data: review })
              }
            })
        }
      })
    })
  }

exports.deleteOne = (req, res) => {
  const reviewId = req.params.review_id
    Review.remove({_id: reviewId}, (err) => {
      if (err) {
        res.json({ message: err, data: null}) 
      } else { 
        res.json({ message: `Successfully deleted review.`, data: {} }) 
      }
    })
  }


  exports.getReviewsByProduct = (req,res) => {
    const productId = req.params.product_id
    Review.find({product: productId})
      .populate('user')
      .populate('product')
      .exec((err, reviews) => {
        if (err) {
          res.json({message: err, data: null})
        } else {
          res.json({message: 'Successfully retrieved product reviews', data: reviews})
        }
      })

  }
