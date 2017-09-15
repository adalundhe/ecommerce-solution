const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  local: {
    firstName: String,
    lastName: String,
    email: String,
    password: String
  },
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

UserSchema.methods.loadData = function (data) {
  this.name = data.name || this.name
  this.password = data.password || this.password
  this.address = data.address || this.address
}

UserSchema.methods.setMetaDates = function () {
  const newDate = new Date()
  this.created = this.created || newDate
  this.modified = newDate
}

module.exports = mongoose.model('User', UserSchema)
