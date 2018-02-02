import PropTypes from 'prop-types'
import React from 'react'
import * as AppPropTypes from '../../../lib/propTypes'
import injectSheet from 'react-jss'
import Typography from 'material-ui/Typography'
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

const CartCard = ({product, addToCart, removeFromCart, classes}) =>
  <Card className={classes.card}>
    <Typography type='display2'>{product.name}</Typography>
    <Typography type='display1'>Category: {product.category}</Typography>
    <Typography type='subheading'>Price: {product.price}</Typography>
    <Typography type='subheading'>Quantity: {product.quantity}</Typography>
    <Typography type='subheading'>Subtotal: {product.price * product.quantity}</Typography>
    {
      product.image ? <img src={product.image} alt='product img' /> : <h5>Image Unavailable</h5>
    }
    <div>
      <Button raised onClick={addToCart}>Add</Button>
      <Button raised onClick={removeFromCart}>Remove</Button>
    </div>
  </Card>

CartCard.propTypes = {
  product: AppPropTypes.product,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default enhancer(CartCard)