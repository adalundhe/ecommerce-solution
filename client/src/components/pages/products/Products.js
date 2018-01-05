import React from 'react'
import {Route} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import ProductList from './ProductList'
import AddProductContainer from './AddProductContainer'
import EditProductContainer from './EditProductContainer'
import PropTypes from 'prop-types'

const Products = ({classes, domainData}) =>
  <div>
    <Route
      path='/products' exact
      render={() => <ProductList domainData={domainData} />}
    />
    <Route
      path='/products/add'
      render={() => <AddProductContainer domainData={domainData} />}
    />
    <Route
      path='/products/edit/:productId'
      render={() => <EditProductContainer domainData={domainData} />
      }
    />
  </div>

Products.propTypes = {
  domainData: AppPropTypes.domainData,
  classes: PropTypes.object
}

export default Products
