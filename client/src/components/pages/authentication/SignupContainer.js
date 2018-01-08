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

  handleOnChange = (event) => this.setState({ [event.target.id]: event.target.value })

  onSubmit = (event) => {
    event.preventDefault()
    this.props.domainData.signupUser(this.state)
      .then(() => this.props.history.push('/'))
      .catch(err => alert(err, Object.keys(err)))
  }
  render () {
    return (
      <SignupForm
        handleOnChange={this.handleOnChange}
        onSubmit={this.onSubmit}
        {...this.state}
      />
    )
  }
}

export default withRouter(SignUpContainer)
