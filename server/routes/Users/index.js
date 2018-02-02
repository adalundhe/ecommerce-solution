const UserRoutes = require('./users')
const express = require('express')
const Router = express.Router()

Router.route('/')
    .get(UserRoutes.getAll)
    .post(UserRoutes.postOne)

Router.route('/:user_id')
    .get(UserRoutes.getOne)
    .put(UserRoutes.putOne)
    .delete(UserRoutes.deleteOne)


Router.route('/admin/:user_id')
    .put(UserRoutes.setPrivlidges)


Router.route('/cart/:user_id')
    .put(UserRoutes.addToCart)


Router.route('/cart/remove/:user_id')
    .put(UserRoutes.removeFromCart)

module.exports = Router