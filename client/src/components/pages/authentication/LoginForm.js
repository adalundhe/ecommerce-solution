import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import injectSheet from 'react-jss'
import Typography from 'material-ui/Typography'
// https://material-ui-next.com/style/typography/
import Button from 'material-ui/Button'
// https://material-ui-next.com/demos/buttons/
import Card from 'material-ui/Card';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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

const LoginForm = ({handleOnChange, onSubmit, classes}) =>
  <div className={classes.container}>
    <Card>
      <form className={classes.formContainer}>
        <Typography type="display1" gutterBottom>
          User Login
        </Typography>
        <div className={classes.fieldContainer}>
          <Typography type="subheading" gutterBottom>
            Email
          </Typography>
          <input type='email' onChange={handleOnChange} id='email' />
        </div>
        <div className={classes.fieldContainer}>
          <Typography type="subheading" gutterBottom>
            Password
          </Typography>
          <input type='password' onChange={handleOnChange} id='password' />
        </div>
        <div className={classes.fieldContainer}>
          <Button onClick={onSubmit} raised> Login </Button>
          <Link to={'/signup'}>Sign Up</Link>
        </div>
      </form>
    </Card>
  </div>

LoginForm.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default enhancer(LoginForm)
