import React, { Component } from 'react'
import { Button, Required } from '../../Utils/Utils'
// import AuthApiService from '../../services/auth-api-service'

import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = e => {
    e.preventDefault()
    const { full_name, password_match, user_name, password } = e.target
    console.log(full_name.value)
    console.log(user_name.value)
    console.log(password.value)
    console.log(password_match.value)

  //   this.setState({ error: null })
  //    AuthApiService.postUser({
  //      user_name: user_name.value,
  //      password: password.value,
  //      full_name: full_name.value,
  //      nickname: nick_name.value,
  //    }).then(user => {
  //     full_name.value = ''
  //     nick_name.value = ''
  //     user_name.value = ''
  //     password.value = ''
  //     this.props.onRegistrationSuccess()
  //   })
  //  .catch(res => {
  //    this.setState({ error: res.error })
  //  })
    this.props.history.push('/app')
  }

  render() {
    const { error } = this.state
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Sign up form</legend>
          <div role="alert">
            {error && <p className="red">{error}</p>}
          </div>
          <p>
            <label htmlFor="RegistrationForm__full_name">Full name <Required /></label>
            <input type="text" name="full_name" id="RegistrationForm__full_name" required />
          </p>
          <p>
            <label htmlFor="RegistrationForm__user_name">User name <Required /></label>
            <input type="text" name="user_name" id="RegistrationForm__user_name" required />
          </p>
          <p>
            <label htmlFor="RegistrationForm__password">Password <Required /></label>
            <input type="password" name="password" id="RegistrationForm__password" required />
          </p>
          <p>
            <label htmlFor="RegistrationForm__password_match">Match Password <Required /></label>
            <input type="password" name="password_match" id="RegistrationForm__password_match" required />
          </p>
          <Button className="signUp" type="submit">Sign Up</Button>
        </fieldset>
      </form>
    )
  }
}
