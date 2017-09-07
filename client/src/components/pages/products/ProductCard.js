import PropTypes from 'prop-types'
import React from 'react'
import * as AppPropTypes from '../../../lib/propTypes'

const propTypes = {
  product: AppPropTypes.product,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

const ProductCard = (props) =>
  <div>
    <h1>{props.product.name}</h1>
    <h3>{props.product.price}</h3>
    <button onClick={props.onEdit}>Edit</button>
    <button onClick={props.onDelete}>Delete</button>
  </div>

ProductCard.propTypes = propTypes

export default ProductCard
