import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import * as AppPropTypes from '../../../lib/propTypes'
import SignupForm from './SignupForm'

class SignUpContainer extends Component {
  static propTypes = {
    domainData: AppPropTypes.domainData,
    history: PropTypes.object.isRequired
  }

  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  }

  callbacks = {
    onFirstNameChanged: event => this.setState({firstName: event.target.value}),

    onLastNameChanged: event => this.setState({lastName: event.target.value}),

    onEmailChanged: event => this.setState({email: event.target.value}),

    onPasswordChanged: event => this.setState({password: event.target.value}),

    onSubmit: event => {
      event.preventDefault()
      this.props.domainData.signupUser(this.state)
        .then(() => this.props.history.push('/'))
        .catch(err => console.log(err, Object.keys(err)))
    }
  }
  render () {
    return (
        <SignupForm
          {...this.state}
          {...this.callbacks}
        />
    )
  }
}

export default withRouter(SignUpContainer)
