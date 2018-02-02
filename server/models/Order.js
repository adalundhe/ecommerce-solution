const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  status: {type: Number, required: true},
  total: {type: Number, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: {type: Date, required: true}
},
{usePushEach: true})

OrderSchema.methods.setData = function (data) {
  this.total = data.total || this.total
  this.products = data.products.map(product => mongoose.Types.ObjectId(product._id)) || this.products
  this.status = data.status || this.status
  this.user = mongoose.Types.ObjectId(data.user._id) || this.user
} 


OrderSchema.methods.setMetaDates = function () {
  const newDate = new Date()
  this.created = this.created || newDate
}

module.exports = mongoose.model('Order', OrderSchema)
