const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  status: {type: Number, required: true}
})

OrderSchema.methods.setStatus = function () {
  this.status = 1
}
module.exports = mongoose.model('Order', OrderSchema)
