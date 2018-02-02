const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
  created: {type: Date, required: true},
  modified: {type: Date, required: true}
})

ReviewSchema.methods.loadData = function (data) {
  this.rating = data.rating || this.rating
  this.comment = data.comment || this.comment
  this.user = data.user || this.user
  this.product = data.product || this.product
}

ReviewSchema.methods.setMetaDates = function () {
  const newDate = new Date()
  this.created = this.created || newDate
  this.modified = newDate
}

module.exports = mongoose.model('Review', ReviewSchema)
