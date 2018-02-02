import PropTypes from 'prop-types'
import React from 'react'
import * as AppPropTypes from '../../../lib/propTypes'
import injectSheet from 'react-jss'
import Typography from 'material-ui/Typography'
import {ReviewContainer} from '../reviews'
// https://material-ui-next.com/style/typography/
import Button from 'material-ui/Button'
// https://material-ui-next.com/demos/buttons/
import Card from 'material-ui/Card'

const styles = {
  card: {
    width: 'calc(33.333% - 20px)',
    border: 'solid 3px red'
  }
}

const enhancer = injectSheet(styles)

const ProductCard = ({product, onEdit, onDelete, onAdd, 
                      submitReview, loggedIn, isAdmin, classes,
                      getProductReviews, user, deleteReview,
                      editReview
                    }) =>
  <Card className={classes.card}>
    <Typography type='display2'>{product.name}</Typography>
    <Typography type='display1'>{product.category}</Typography>
    <Typography type='subheading'>{product.price}</Typography>
    {
      product.image ? <img src={product.image} alt='product img' /> : <h5>Image Unavailable</h5>
    }
    <div>
    {
      isAdmin ?
      <div>
        <Button raised onClick={onEdit}>Edit</Button>
        <Button raised onClick={onDelete}>Delete</Button>
      </div>
      : null
    }
    {loggedIn ? <Button raised onClick={onAdd}>Add to Cart</Button> : null}
    </div>
    <div>
      <ReviewContainer 
        product={product} 
        submitReview={submitReview}
        deleteReview={deleteReview} 
        getProductReviews={getProductReviews}
        editReview={editReview}
        loggedIn={loggedIn}
        user={user}
      />
    </div>
  </Card>

ProductCard.propTypes = {
  product: AppPropTypes.product,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  getProductReviews: PropTypes.func.isRequired,
  submitReview: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default enhancer(ProductCard)
