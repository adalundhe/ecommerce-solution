import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'
import {Link} from 'react-router-dom'
import Typography from 'material-ui/Typography'
// https://material-ui-next.com/style/typography/
import Button from 'material-ui/Button'
// https://material-ui-next.com/demos/buttons/
import Card from 'material-ui/Card'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const enhancer = injectSheet(styles)

const EditProductForm = ({classes, onSubmit, handleOnChange, name, category, image, price}) =>
  <div className={classes.container}>
    <Card>
      <form className={classes.formContainer}>
        <Typography type='display1' gutterBottom>
          Update Product
        </Typography>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
          Product Name
          </Typography>
          <input type='text' onChange={handleOnChange} value={name} id='name' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Category
          </Typography>
          <input type='text' onChange={handleOnChange} value={category} id='category' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Image
          </Typography>
          <input type='text' onChange={handleOnChange} value={image} id='image' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Price
          </Typography>
          <input type='number' onChange={handleOnChange} value={price} id='price' />
        </div>
        <div className={classes.fieldContainer}>
          <Button onClick={onSubmit} raised> Update Product </Button>
          <Link to='/products'>Cancel</Link>
        </div>
      </form>
    </Card>
  </div>

EditProductForm.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired
}

export default enhancer(EditProductForm)
