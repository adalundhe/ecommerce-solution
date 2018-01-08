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

const ProductCard = ({product, onEdit, onDelete, classes}) =>
  <Card className={classes.card}>
    <Typography type='display2'>{product.name}</Typography>
    <Typography type='display1'>{product.category}</Typography>
    <Typography type='subheading'>{product.price}</Typography>
    {
      product.image ? <img src={product.image} alt='product img' /> : <h5>Image Unavailable</h5>
    }
    <Button raised onClick={onEdit}>Edit</Button>
    <Button raised onClick={onDelete}>Delete</Button>
  </Card>

ProductCard.propTypes = {
  product: AppPropTypes.product,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default enhancer(ProductCard)
