const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const reviewRoutes = require('./routes/reviews')
const orderRoutes = require('./routes/orders')

const app = express()
const port = 3001

mongoose.connect('mongodb://localhost/e-commerce')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'blahblahblah'
})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(session({
  cookie: {
    maxAge: 60000
  }
}))

require('./config/passport')(passport) // pass passport for configuration
require('./routes/Users/auth')(app, passport) // load our routes and pass in our app and fully configured passport

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/orders', orderRoutes)

const server = app.listen(port, () => console.log(`Running on port: ${port}`))

module.exports = server
