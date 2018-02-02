const ProductRoutes = require('./products')
const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(ProductRoutes.getAll)
    .post(ProductRoutes.postOne)

Router.route('/:product_id')
    .get(ProductRoutes.getOne)
    .put(ProductRoutes.putOne)
    .delete(ProductRoutes.deleteOne)


Router.route('/reviews/:product_id')
    .put(ProductRoutes.addReview)


Router.route('/reviews/remove/:product_id')
    .put(ProductRoutes.removeReview)


module.exports = Router