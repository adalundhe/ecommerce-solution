import React from 'react'
import {Link} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import ProductCard from './ProductCard'

const propTypes = {
  domainData: AppPropTypes.domainData
}

const ProductList = (props) =>
  <div>
    <h1>Product List</h1>

    <Link to='/products/add'>Add a new Product</Link>

    {
      props.domainData.products.map(product =>
        <ProductCard
          key={product._id}
          product={product}
          onDelete={() => props.domainData.deleteProduct(product._id)}
        />
      )
    }
  </div>

ProductList.propTypes = propTypes

export default ProductList
