import React, {Component} from 'react'
import Layout from './components/structure/Layout'
import * as ServerApi from './lib/serverApi'

class DomainDataProvider extends Component {
  state = {
    isLoaded: false,
    products: [],
    user: null
  }

  componentDidMount () {
    this.getAllProducts()
    this.get
  }

  getAllProducts = () =>
    ServerApi.getAllProducts(products =>
      this.setState({
        isLoaded: true,
        products: products
      }))

  addProduct = (newProduct) =>
    ServerApi.addProduct(newProduct, this.getAllProducts)

  deleteProduct = (productId) =>
    ServerApi.deleteProduct(productId, this.getAllProducts)

  updateProduct = (product) =>
    ServerApi.updateProduct(product, this.getAllProducts)

  findProductById = (productId) => this.state.products.find(p => p._id === productId)

  render () {
    const domainData = {
      isLoaded: this.state.isLoaded,
      products: this.state.products,
      addProduct: this.addProduct,
      deleteProduct: this.deleteProduct,
      updateProduct: this.updateProduct,
      findProductById: this.findProductById
    }

    return this.state.isLoaded ? <Layout domainData={domainData} /> : null
  }
}

export default DomainDataProvider
