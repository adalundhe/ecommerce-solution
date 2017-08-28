const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  total: {type: Number, required: true},
  status: {type: Number, required: true}
})

OrderSchema.methods.setStatus = function () {
  this.status = 1
  this.total = this.products.reduce((sum, product) => sum + product.price, 0)
}
module.exports = mongoose.model('Order', OrderSchema)
