import React, {Component} from 'react'
import Layout from './components/structure/Layout'
import * as ServerApi from './lib/serverApi'

class DomainDataProvider extends Component {
  state = {
    isLoaded: false,
    products: [],
    user: null
  }

  methods = {
    getAllProducts: () =>
      ServerApi.getAllProducts()
        .then(products =>
          this.setState({
            isLoaded: true,
            products: products
          })),

    addProduct: (newProduct) =>
      ServerApi.addProduct(newProduct)
        .then(this.methods.getAllProducts),

    deleteProduct: (productId) =>
      ServerApi.deleteProduct(productId)
        .then(this.methods.getAllProducts),

    updateProduct: (product) =>
      ServerApi.updateProduct(product)
        .then(this.methods.getAllProducts),

    findProductById: (productId) => this.state.products.find(p => p._id === productId),

    signupUser: (user) =>
      ServerApi.signupUser(user)
        .then(user => {
          this.setState({user})
          return user
        }),

    loginUser: (email, password) =>
      ServerApi.loginUser(email, password)
        .then(user => {
          this.setState({user})
          return user
        }),

    getUser: () =>
      ServerApi.getUser()
        .then(user => {
          this.setState({user})
          return user
        }),

    logoutUser: () =>
      ServerApi.logoutUser()
        .then(() => this.setState({user: null}))
  }

  componentDidMount () {
    this.methods.getAllProducts()
    this.methods.getUser()
  }

  render () {
    const domainData = {
      ...this.state,
      ...this.methods,
      loggedIn: this.state.user != null,
      loggedOut: this.state.user == null
    }

    return this.state.isLoaded ? <Layout domainData={domainData} /> : null
  }
}

export default DomainDataProvider
