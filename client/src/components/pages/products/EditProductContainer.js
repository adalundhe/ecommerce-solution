import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import EditProductForm from './EditProductForm'

class EditProductContainer extends Component {
  static propTypes = {
    domainData: AppPropTypes.domainData,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  constructor ({domainData, location, match}) {
    super()
    const {product} = location.state || domainData.findProductById(match.params.productId)

    this.state = { // copy product into state
      ...product
    }
  }

  callbacks = {
    onNameChanged: (event) => this.setState({name: event.target.value}),

    onCategoryChanged: (event) => this.setState({category: event.target.value}),

    onImageChanged: (event) => this.setState({image: event.target.value}),

    onPriceChanged: (event) => this.setState({price: event.target.value}),

    onSubmit: (event) => {
      event.preventDefault()
      this.props.domainData.updateProduct(this.state)
        .then(() => this.props.history.push('/products'))
    }
  }

  render () {
    return <EditProductForm
      {...this.state}
      {...this.callbacks}
    />
  }
}

export default withRouter(EditProductContainer)
