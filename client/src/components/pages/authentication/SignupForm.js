import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import injectSheet from 'react-jss'


const styles = {
  container: {
    height: '100vh',
    width: '100vw'
  },
  formContainer: {
    height: '50vh',
    width: '50vh',
    border: 'solid 3px red'
  }
}

const enhancer = injectSheet(styles)


const SignupForm = ({onFirstNameChanged, onLastNameChanged, onEmailChanged, onPasswordChanged, onSubmit}) => (
  <div>
    <h3>New User Sign Up</h3>
    <form>
      <label>First Name</label>
      <input type='text' placeholder='first name'
        onChange={onFirstNameChanged} />

      <label>Last Name</label>
      <input type='text' placeholder='last name'
        onChange={onLastNameChanged} />

      <label>Email</label>
      <input type='email' placeholder='email address'
        onChange={onEmailChanged} />

      <label>Password</label>
      <input type='password' placeholder='password'
        onChange={onPasswordChanged} />

      <button type='button' className='btn btn-success'
        onClick={onSubmit}>Sign Up</button>

      <Link to={'/login'}>Login</Link>
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
