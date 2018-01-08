import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import AddProductForm from './AddProductForm'

class AddProductContainer extends Component {
  static propTypes = {
    domainData: AppPropTypes.domainData,
    history: PropTypes.object.isRequired
  }

  state = {
    name: undefined,
    category: undefined,
    image: undefined,
    price: undefined
  }

  handleOnChange = (event) => this.setState({ [event.target.id]: event.target.value })

  onSubmit = (event) => {
    event.preventDefault()
    const product = {
      name: this.state.name,
      category: this.state.category,
      image: this.state.image,
      price: parseFloat(this.state.price)
    }
    this.props.domainData.addProduct(product)
    this.props.history.push('/products')
  }

  render () {
    return <AddProductForm
      {...this.state}
      handleOnChange={this.handleOnChange}
      onSubmit={this.onSubmit}
    />
  }
}

export default withRouter(AddProductContainer)
