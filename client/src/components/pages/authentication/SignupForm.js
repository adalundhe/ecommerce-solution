import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'

const propTypes = {
  onFirstNameChanged: PropTypes.func.isRequired,
  onLastNameChanged: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

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

SignupForm.propTypes = propTypes

export default SignupForm
