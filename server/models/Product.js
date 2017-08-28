const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {type: String, required: true},
  image: { type: String, required: true },
  created: { type: Date, required: true },
  modified: { type: Date, required: true },
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

ProductSchema.methods.loadData = function (data) {
  this.name = data.name || this.name
  this.price = data.price || this.price
  this.category = data.category || this.category
  this.image = data.image || this.image
}

ProductSchema.methods.setMetaDates = function () {
  const newDate = new Date()
  this.created = this.created || newDate
  this.modified = newDate
}

module.exports = mongoose.model('Product', ProductSchema)
