import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import EditProductForm from './EditProductForm'
import $ from 'jquery'

class EditProductContainer extends Component {
  static propTypes = {
    domainData: AppPropTypes.domainData,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    name: undefined,
    image: undefined,
    category: undefined,
    price: undefined,
    loaded: false
  }

  componentDidMount () {
    $.ajax({
      url: `/api/products/${this.props.match.params.productId}`,
      method: 'GET'
    }).done(response => {
      this.setState({
        name: response.data.name,
        image: response.data.image,
        category: response.data.category,
        price: response.data.price,
        id: response.data._id,
        loaded: true
      })
    })
  }

  handleOnChange = (event) => this.setState({ [event.target.id]: event.target.value })

  onSubmit = (event) => {
    event.preventDefault()
    const updatedProduct = {
      name: this.state.name,
      image: this.state.image,
      category: this.state.category,
      price: this.state.price,
      id: this.state.id
    }
    this.props.domainData.updateProduct(updatedProduct)
    this.props.history.push('/products')
  }

  render () {
    return this.state.loaded ? <EditProductForm
      {...this.state}
      handleOnChange={this.handleOnChange}
      onSubmit={this.onSubmit}
    /> : <h3>Unable To Find Product</h3>
  }
}

export default withRouter(EditProductContainer)
