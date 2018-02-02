const OrderRoutes = require('./orders')
const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(OrderRoutes.getAll)
    .post(OrderRoutes.postOne)

Router.route('/:order_id')
    .get(OrderRoutes.getOne)
    .put(OrderRoutes.putOne)
    .delete(OrderRoutes.deleteOne)

Router.route('/filter/user/:user_id')
    .get(OrderRoutes.getUserOrders)


module.exports = Router