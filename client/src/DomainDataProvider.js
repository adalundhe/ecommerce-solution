import React, {Component} from 'react'
import Layout from './components/structure/Layout'
import $ from 'jquery'
import * as UserApi from './lib/userApi'

class DomainDataProvider extends Component {
  state = {
    isLoaded: false,
    products: [],
    user: null,
    product: null,
    cart: []
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
          console.log("GOT",user)
          this.methods.getUserData(user)
          return user
        }),

    getUser: () =>
      UserApi.getUser()
        .then(user => {
          if(user){
            this.methods.getUserData(user)
          }    
          return user
        }),

    logoutUser: () =>
      UserApi.logoutUser()
        .then(() => this.setState({user: null})),
    
    getUserData: (user) => {
      $.ajax({
        url: `/api/users/${user._id}`,
        method: 'GET'
      })
      .done(response => {
        console.log("GOT",response.data)
        this.setState({user: response.data, cart: response.data.cart})
      })
    },
    
    addToCart: (product) => {
      $.ajax({
        url: `/api/users/cart/${this.state.user._id}`,
        method: 'PUT',
        data: product
      })
      .done(response => this.setState({cart: response.data}))
    },

    removeFromCart: (product) => {
      $.ajax({
        url: `/api/users/cart/remove/${this.state.user._id}`,
        method: 'PUT',
        data: product
      })
      .done(response => this.setState({cart: response.data}))
    },

    submitReview: (comment, rating, productId) => {
      $.ajax({
        url: '/api/reviews',
        method: 'POST',
        data: {comment: comment, rating: rating, user: this.state.user._id, product: productId}
      })
      .done(response => {
        const review = response.data

        $.ajax({
          url: `/api/products/reviews/${productId}`,
          method: 'PUT',
          data: review
        })
        .done(response => {
          this.methods.getProductReviews(response.data)
        })
      })
    },
    getProductReviews: (productReviewed) => {
      console.log("INCOMING",productReviewed)
      $.ajax({
        url: `/api/reviews/filter/product/${productReviewed._id}`,
        method: 'GET'
      })
      .done(response => {
        productReviewed.reviews = response.data
        const products = this.state.products.map(product => (product._id === productReviewed._id) ? productReviewed: product)
        this.setState({products})
      })
    },
    editReview: (review, productReviewed) => {
      console.log('EDITING',review)
      $.ajax({
        url: `/api/reviews/${review._id}`,
        method: 'PUT',
        data: review
      })
      .done(response => {
        console.log('EDITED:',response.data)
       this.methods.getProductReviews(productReviewed) 
      })
    },
    deleteReview: (review, productId) => {
      $.ajax({
        url: `/api/reviews/${review._id}`,
        method: 'DELETE'
      })
      .done(response => {
        $.ajax({
          url: `/api/products/reviews/remove/${productId}`,
          method: 'PUT'
        })
        .done(response => {
          this.methods.getProductReviews(response.data)
        })
      })
    },
    submitOrder: (total) => {
      console.log(total)
      const order = {products: this.state.cart, user: this.state.user, status: 1, total: total}
      $.ajax({
        url: '/api/orders',
        method: 'POST',
        data: order
      })
      .done(response => {
        this.methods.getUserOrders(this.state.user)
      })
    },
    getUserOrders: (user) => {
      $.ajax({
        url: `/api/orders/filter/user/${user._id}`,
        method: 'GET'
      })
      .done(response => {
        user.orders = response.data
        this.setState({user})
      })
    }
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
