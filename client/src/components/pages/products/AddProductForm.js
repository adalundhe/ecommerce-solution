import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import injectSheet from 'react-jss'
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

const AddProductForm = ({classes, handleOnChange, onSubmit, name, category, price, image}) =>
  <div className={classes.container}>
    <Card>
      <form className={classes.formContainer}>
        <Typography type='display1' gutterBottom>
      Create Product
        </Typography>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
        Product Name
          </Typography>
          <input type='text' onChange={handleOnChange} id='name' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
        Category
          </Typography>
          <input type='text' onChange={handleOnChange} id='category' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
      Image
          </Typography>
          <input type='text' onChange={handleOnChange} id='image' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
    Price
          </Typography>
          <input type='number' onChange={handleOnChange} id='price' />
        </div>
        <div className={classes.fieldContainer}>
          <Button onClick={onSubmit} raised disabled={!name || !category || !image || !price}> Create </Button>
          <Link to='/products'>Cancel</Link>
        </div>
      </form>
    </Card>
  </div>

AddProductForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default enhancer(AddProductForm)
