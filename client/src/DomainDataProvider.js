import React, {Component} from 'react'
import Layout from './components/structure/Layout'
import * as ServerApi from './lib/serverApi'

class DomainDataProvider extends Component {
  state = {
    isLoaded: false,
    products: []
  }

  componentDidMount () {
    this.getAllProducts()
  }

  getAllProducts = () =>
    ServerApi.getAllProducts(products =>
      this.setState({
        isLoaded: true,
        products
      }))

  addProduct = (newProduct) =>
    ServerApi.addProduct(newProduct, this.getAllProducts)

  deleteProduct = (productId) =>
    ServerApi.deleteProduct(productId, this.getAllProducts)

  render () {
    const domainData = {
      addProduct: this.addProduct,
      deleteProduct: this.deleteProduct,
      isLoaded: this.state.isLoaded,
      products: this.state.products
    }

    return (
      <Layout domainData={domainData} />
    )
  }
}

export default DomainDataProvider
