import PropTypes from 'prop-types'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import ProductCard from './ProductCard'
import Typography from 'material-ui/Typography'
import injectSheet from 'react-jss'
import {compose} from 'recompose'

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

const ProductList = ({domainData, history, classes}) => {
  return (
    <div>
    <Typography type='display2' gutterBottom align='center'>
      Products
    </Typography>

    {domainData.user && domainData.user.isAdmin ? <Link to='/products/add'>Add a new Product</Link> : null}
    <div className={classes.productListContainer}>
      {
        domainData.products.map(product =>
          <ProductCard
            key={product._id}
            product={product}
            loggedIn={domainData.loggedIn}
            isAdmin={domainData.user ? domainData.user.isAdmin : false}
            onDelete={() => domainData.deleteProduct(product._id)}
            submitReview={domainData.submitReview}
            deleteReview={domainData.deleteReview}
            editReview={domainData.editReview}
            getProductReviews={domainData.getProductReviews}
            user={domainData.user}
            onEdit={() => history.push({
              pathname: `/products/edit/${product._id}`,
              state: {product}
            })}
            onAdd={() => domainData.addToCart(product)}
          />
        )
      }
    </div>

  </div>
  )
}

ProductList.propTypes = {
  domainData: AppPropTypes.domainData,
  classes: PropTypes.object,
  history: PropTypes.object.isRequired
}

export default enhancer(ProductList)
