const ReviewRoutes = require('./reviews')
const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(ReviewRoutes.getAll)
    .post(ReviewRoutes.postOne)

Router.route('/:review_id')
    .get(ReviewRoutes.getOne)
    .put(ReviewRoutes.putOne)
    .delete(ReviewRoutes.deleteOne)


Router.route('/filter/product/:product_id')
    .get(ReviewRoutes.getReviewsByProduct)


module.exports = Router