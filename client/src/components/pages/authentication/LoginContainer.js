import React, {Component} from 'react'
import $ from 'jquery'
import LoginForm from './LoginForm'

class LoginContainer extends Component {
  state = {
    email: undefined,
    password: undefined
  }

  updateField = (field, value) => {
    const newState = {}
    newState[field] = value
    this.setState(newState)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const local = {
      email: this.state.email,
      password: this.state.password
    }
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: local

    }).done((response) => {
    						 (response.user._id)
    					   ? window.location = '/products'
        : window.locatin = '/login'
    })
  }
  render () {
    return (
      <LoginForm
        updateField={this.updateField}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}
export default LoginContainer
