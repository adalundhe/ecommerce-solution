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

const SignupForm = ({handleOnChange, onSubmit, classes}) => (
  <div className={classes.container}>
    <Card>
      <form className={classes.formContainer}>
        <Typography type='display1' gutterBottom>
          User Registration
        </Typography>
        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            First Name
          </Typography>
          <input type='text' placeholder='John'
            onChange={handleOnChange} id='firstName' />
        </div>

        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Last Name
          </Typography>
          <input type='text' placeholder='Doe'
            onChange={handleOnChange} id='lastName' />
        </div>

        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Email
          </Typography>
          <input type='email' placeholder='john@gmail.com'
            onChange={handleOnChange} id='email' />
        </div>

        <div className={classes.fieldContainer}>
          <Typography type='subheading' gutterBottom>
            Password
          </Typography>
          <input type='password'
            onChange={handleOnChange} id='password' />
        </div>

        <div className={classes.fieldContainer}>
          <Button onClick={onSubmit} raised> Register </Button>
          <Link to={'/login'}>Login</Link>
        </div>
      </form>
    </Card>
  </div>
)

SignupForm.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default enhancer(SignupForm)
