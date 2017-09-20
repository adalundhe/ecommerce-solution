const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
console.log('mongoose types', mongoose.Types)


const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const reviewRoutes = require('./routes/reviews')
const orderRoutes = require('./routes/orders')

const app = express()
const port = 3001
app.set('trust proxy', '127.0.0.1')

mongoose.connect('mongodb://localhost/e-commerce')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  name: 'ecommerce',
  secret: '42',
  secure: false
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

require('./passport/strategies')(passport) // pass passport for configuration
require('./passport/routes')(app, passport) // load our routes and pass in our app and fully configured passport

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/orders', orderRoutes)

app.use(require('./config/error-handler'))

const server = app.listen(port, () => console.log(`Running on port: ${port}`))

module.exports = server
