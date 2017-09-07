import PropTypes from 'prop-types'
import React, {Component} from 'react'
import * as AppPropTypes from '../../../lib/propTypes'
import AddProductForm from './AddProductForm'

class AddProductContainer extends Component {
  static propTypes = {
    domainData: AppPropTypes.domainData,
    history: PropTypes.object.isRequired
  }

  state = {
    name: '',
    category: '',
    image: '',
    price: 0
  }

  onNameChanged = (event) => this.setState({
    name: event.target.value
  })

  onCategoryChanged = (event) => this.setState({
    category: event.target.value
  })

  onImageChanged = (event) => this.setState({
    image: event.target.value
  })

  onPriceChanged = (event) => {
    const price = event.target.value || '0'
    this.setState({
      price: parseFloat(price)
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.domainData.addProduct(this.state)
    this.props.history.push('/products')
  }

  render () {
    return <AddProductForm
      name={this.state.name}
      onNameChanged={this.onNameChanged}
      category={this.state.category}
      onCategoryChanged={this.onCategoryChanged}
      image={this.state.image}
      onImageChanged={this.onImageChanged}
      price={this.state.price}
      onPriceChanged={this.onPriceChanged}
      onSubmit={this.onSubmit}
    />
  }
}

export default AddProductContainer
