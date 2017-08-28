const express = require('express')

const Router = express.Router()
const Product = require('../models/Product')

Router.route('/')
  .get((req, res) => {
    Product.find((err, products) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: 'Successfully retrieved all products!', data: products })
      }
    })
  })
  .post((req, res) => {
    const product = new Product()
    product.loadData(req.body)
    product.setMetaDates()
    product.save((err, savedProduct) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: `Successfully created new product: ${savedProduct.name}`, data: savedProduct })
      }
    })
  })

Router.route('/:product_id')
  .get((req, res) => {
    Product.findById(req.params.product_id, (err, product) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: `Successfully updated product: ${product.name}`, data: product })
      }
    })
  })
  .put((req, res) => {
    Product.findById(req.params.product_id, (err, product) => {
      product.loadData(req.body)
      product.setMetaDates()
      console.log('PUTTING PRODUCT', product)
      product.save((err, savedProduct) => {
        if (err) {
          res.json({ message: err, data: null })
        } else {
          res.json({ message: `Successfully updated product: ${product.name}`, data: savedProduct })
        }
      })
    })
  })
  .delete((req, res) => {
    Product.remove({ _id: req.params.product_id }, (err) => {
      if (err) {
        res.json({ message: err, data: null })
      } else {
        res.json({ message: 'Product successfully deleted.', data: {} })
      }
    })
  })

module.exports = Router
