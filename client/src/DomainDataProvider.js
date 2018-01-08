import React, {Component} from 'react'
import Layout from './components/structure/Layout'
import $ from 'jquery'
import * as UserApi from './lib/userApi'

class DomainDataProvider extends Component {
  state = {
    isLoaded: false,
    products: [],
    user: null,
    product: null
  }

  methods = {
    getAllProducts: () => {
      $.ajax({
        url: '/api/products',
        method: 'GET'
      }).done(response => {
        this.setState({
          isLoaded: true,
          products: response.data
        })
      })
    },

    addProduct: (newProduct) => {
      $.ajax({
        url: '/api/products',
        method: 'POST',
        data: newProduct
      }).done(response => {
        console.log(response)
        this.methods.getAllProducts()
      })
    },

    deleteProduct: (productId) => {
      $.ajax({
        url: `/api/products/${productId}`,
        method: 'DELETE'
      }).done(response => {
        console.log(response)
        this.methods.getAllProducts()
      })
    },

    updateProduct: (product) => {
      $.ajax({
        url: `/api/products/${product.id}`,
        method: 'PUT',
        data: product
      }).done(response => {
        console.log(response)
        this.methods.getAllProducts()
      })
    },

    signupUser: (user) =>
      UserApi.signupUser(user)
        .then(user => {
          this.setState({user})
          return user
        }),

    loginUser: (email, password) =>
      UserApi.loginUser(email, password)
        .then(user => {
          this.setState({user})
          return user
        }),

    getUser: () =>
      UserApi.getUser()
        .then(user => {
          this.setState({user})
          return user
        }),

    logoutUser: () =>
      UserApi.logoutUser()
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
