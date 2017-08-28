import React, {Component} from 'react'
import Layout from './Layout'
import {getAllProducts} from './serverApi'

class DomainDataProvider extends Component {
  state = {
    isLoaded: false,
    products: []
  }

  componentDidMount () {
    getAllProducts(products =>
      this.setState({
        isLoaded: true,
        products
      }))
  }

  render () {
    const domainData = {
      products: this.state.products
    }

    return (
      <Layout domainData={domainData} />
    )
  }
}

export default DomainDataProvider
