import React, { Component } from 'react'
import { Button, InputGroup } from '../../Utils/Utils'
// import AuthApiService from '../../services/auth-api-service'

import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { 
    fullName: '',
    userName: '',
    password: '',
    passwordMatch: '',
    error: null 
  }

  handleSubmit = e => {
    e.preventDefault()
    const { fullName, userName, password, passwordMatch } = this.state
    console.log(fullName)
    console.log(userName)
    console.log(password)
    console.log(passwordMatch)

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

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createInputs = inputs => {
    return inputs.map(input => {
      return (
        <InputGroup 
          key={input.inputID}
          labelFor={input.labelFor}
          labelText={input.labelText}
          inputType={input.inputType}
          inputName={input.inputName}
          inputID={input.inputID}
          inputValue={input.inputValue}
          onChange={this.onChange}
          />
      )
    })
  }

  render() {
    const { error, fullName, userName, password, passwordMatch } = this.state
    const inputs = [
      {
        labelFor: 'RegistrationForm__full_name',
        labelText: 'Full Name',
        inputType: 'text',
        inputName: 'fullName',
        inputID: 'RegistrationForm__full_name',
        inputValue: fullName
      },
      {
        labelFor: 'RegistrationForm__user_name',
        labelText: 'User Name',
        inputType: 'text',
        inputName: 'userName',
        inputID: 'RegistrationForm__user_name',
        inputValue: userName
      },
      {
        labelFor: 'RegistrationForm__password',
        labelText: 'Password',
        inputType: 'password',
        inputName: 'password',
        inputID: 'RegistrationForm__password',
        inputValue: password
      },
      {
        labelFor: 'RegistrationForm__password_match',
        labelText: 'Match Password',
        inputType: 'password',
        inputName: 'passwordMatch',
        inputID: 'RegistrationForm__password_match',
        inputValue: passwordMatch
      },
    ]
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Sign up form</legend>
          <div role="alert">
            {error && <p className="red">{error}</p>}
          </div>

          {this.createInputs(inputs)}

          <Button className="signUp" type="submit">Sign Up</Button>
        </fieldset>
      </form>
    )
  }
}
