import React from 'react'
import {Route} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import ProductList from './ProductList'
import AddProductContainer from './AddProductContainer'

const propTypes = {
  domainData: AppPropTypes.domainData
}

const Products = (props) =>
  <div>
    <h1>Products</h1>

    <Route path='/products' exact render={() => <ProductList domainData={props.domainData} />} />
    <Route
      path='/products/add'
      render={(routeProps) => <AddProductContainer domainData={props.domainData} history={routeProps.history} />}
    />
  </div>

Products.propTypes = propTypes

export default Products
