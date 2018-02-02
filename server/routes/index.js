const express = require('express')
const orderRoutes = require('./Orders')
const productRoutes = require('./Products')
const reviewRoutes = require('./Reviews')
const userRoutes = require('./Users')


module.exports = (app) => {
  app.use('/api/orders',orderRoutes)
  app.use('/api/products',productRoutes)
  app.use('/api/reviews',reviewRoutes)
  app.use('/api/users',userRoutes)

}