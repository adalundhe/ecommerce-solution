import React, {Component} from 'react'
import $ from 'jquery'
import SignupForm from './SignupForm'

class SignUpContainer extends Component {

  state = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined
  }


  updateField = (field, value) => {
    const newState = {};
    newState[field] = value;
    this.setState(newState);
   }

	  handleSubmit = (event) => {
	    event.preventDefault()


      const local = {email: this.state.email,
                     password: this.state.password,
                     firstName: this.state.firstName,
                     lastName: this.state.lastName}

      $.ajax({
	      url: '/api/signup',
	      method: 'POST',
	      data: local
	    }).done((response) => (
	      console.log("SUCCESS AT SIGN UP")) ||
	      (response._id) ? //users have to go back to the login page
	      window.location='/login' :
	      window.location=`/err/${response.message}`);
	  }

  render(){
    return(
      <div>
        <SignupForm updateField={this.updateField}  handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default SignUpContainer
