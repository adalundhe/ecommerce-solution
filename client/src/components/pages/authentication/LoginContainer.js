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

  callbacks = {
    onEmailChanged: event => this.setState({
      email: event.target.value
    }),

    onPasswordChanged: event => this.setState({
      password: event.target.value
    }),

    onSubmit: event => {
      event.preventDefault()
      this.props.domainData.loginUser(...this.state)
        .then(() => this.props.history.push('/'))
    }
  }

  render () {
    return (
      <LoginForm
        {...this.state}
        {...this.callbacks}
      />
    )
  }
}

export default withRouter(LoginContainer)
