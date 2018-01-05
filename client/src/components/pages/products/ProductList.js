import PropTypes from 'prop-types'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import ProductCard from './ProductCard'
import Typography from 'material-ui/Typography'
import injectSheet from 'react-jss'
import {compose} from 'recompose'

const propTypes = {
  domainData: AppPropTypes.domainData,
  history: PropTypes.object.isRequired
}

const styles = {
  productListContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const enhancer = compose(
  injectSheet(styles),
  withRouter
)

const ProductList = ({domainData, history, classes}) =>
  <div>
    <Typography type='display2' gutterBottom align='center'>
      Products
    </Typography>

    <Link to='/products/add'>Add a new Product</Link>
    <div className={classes.productListContainer}>
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

  </div>

ProductList.propTypes = propTypes

export default enhancer(ProductList)
