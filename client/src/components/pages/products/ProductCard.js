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
    <h1>{product.name}</h1>
    <h2>{product.category}</h2>
    <h3>{product.price}</h3>
    {
      product.image ? <img src={product.image} /> : <h5>Image Unavailable</h5>
    }
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
  </Card>

ProductCard.propTypes = {
  product: AppPropTypes.product,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default enhancer(ProductCard)
