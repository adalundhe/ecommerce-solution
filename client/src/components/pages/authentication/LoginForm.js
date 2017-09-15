import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'

const propTypes = {
  onEmailChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const LoginForm = ({onEmailChanged, onPasswordChanged, onSubmit}) =>
  <div>
    <h3>Hello from Login</h3>
    <div>
      <label> Email </label>
      <input type='email' onChange={onEmailChanged} />
    </div>
    <div>
      <label> Password </label>
      <input type='password' onChange={onPasswordChanged} />
    </div>
    <div>
      <button type='button' onClick={onSubmit}>Login!</button>
      <Link to={'/signup'}>Sign Up</Link>
    </div>
  </div>

LoginForm.propTypes = propTypes

export default LoginForm
