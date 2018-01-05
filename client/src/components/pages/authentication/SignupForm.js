import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import injectSheet from 'react-jss'


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flexStart',
    alignItems: 'center',
    height: '100vh',
    width: '40vw'
  }
}

const enhancer = injectSheet(styles)


const SignupForm = ({onFirstNameChanged, onLastNameChanged, onEmailChanged, onPasswordChanged, onSubmit, classes}) => (
  <div className={classes.container}>
    <form className={classes.formContainer}>
      <h3>New User Sign Up</h3>
      <div>
        <label>First Name</label>
        <input type='text' placeholder='first name'
          onChange={onFirstNameChanged} />
      </div>

      <div>
        <label>Last Name</label>
        <input type='text' placeholder='last name'
          onChange={onLastNameChanged} />
      </div>

      <div>
        <label>Email</label>
        <input type='email' placeholder='email address'
          onChange={onEmailChanged} />
      </div>

      <div>
        <label>Password</label>
        <input type='password' placeholder='password'
          onChange={onPasswordChanged} />
      </div>

      <div>
        <button type='button' className='btn btn-success'
        onClick={onSubmit}>Sign Up</button>

        <Link to={'/login'}>Login</Link>
      </div>
    </form>
  </div>
)



SignupForm.propTypes = {
  onFirstNameChanged: PropTypes.func.isRequired,
  onLastNameChanged: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default enhancer(SignupForm)
