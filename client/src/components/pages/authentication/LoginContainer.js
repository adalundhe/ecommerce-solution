import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import LoginForm from './LoginForm'

class LoginContainer extends Component {
  static propTypes = {
    domainData: AppPropTypes.domainData,
    history: PropTypes.object.isRequired
  }

  state = {
    email: null,
    password: null
  }

  handleOnChange = (event) => this.setState({ [event.target.id]: event.target.value })

  onSubmit = (event) => {
    event.preventDefault()
    this.props.domainData.loginUser(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/')
        alert('Login successful!')
      })
      .catch(err => console.log(err.errorCode))
  }

  render () {
    return (
      <LoginForm
        {...this.state}
        handleOnChange={this.handleOnChange}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default withRouter(LoginContainer)
