import React from 'react'
import * as AppPropTypes from '../../../lib/propTypes'

const propTypes = {
  product: AppPropTypes.product
}

const ProductCard = (props) =>
  <div>
    <h1>{props.product.name}</h1>
    <h3>{props.product.price}</h3>
  </div>

ProductCard.propTypes = propTypes

export default ProductCard
