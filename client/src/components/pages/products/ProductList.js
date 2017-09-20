import PropTypes from 'prop-types'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import ProductCard from './ProductCard'

const propTypes = {
  domainData: AppPropTypes.domainData,
  history: PropTypes.object.isRequired
}

const ProductList = ({domainData, history}) =>
  <div>
    <h1>Product List</h1>

    <Link to='/products/add'>Add a new Product</Link>

    {
      domainData.products.map(product =>
        <ProductCard
          key={product._id}
          product={product}
          onDelete={() => domainData.deleteProduct(product._id)}
          onEdit={() => history.push({
            pathname: `/products/edit/${product._id}`,
            state: {product}
          })}
        />
      )
    }
  </div>

ProductList.propTypes = propTypes

export default withRouter(ProductList)
