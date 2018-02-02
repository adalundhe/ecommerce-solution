const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  local: {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  isAdmin: {type: Boolean, default: false},
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
},
{usePushEach: true})

UserSchema.methods.loadData = function (data) {
  this.name = data.name || this.name
  this.password = data.password || this.password
  this.address = data.address || this.address
}

UserSchema.methods.setPrivlidges = function (data) {
  this.isAdmin = data.isAdmin || this.isAdmin
}

UserSchema.methods.setMetaDates = function () {
  const newDate = new Date()
  this.created = this.created || newDate
  this.modified = newDate
}

UserSchema.methods.addToCart = function (product_id) {
  console.log("PRODUCTID:",product_id)
  const cart = this.cart
  cart.push(mongoose.Types.ObjectId(product_id))
  this.cart = cart
}

UserSchema.methods.removeFromCart = function(product_id){
  const productId = mongoose.Types.ObjectId(product_id)
  this.cart.splice(this.cart.indexOf(productId), 1)
}

module.exports = mongoose.model('User', UserSchema)
