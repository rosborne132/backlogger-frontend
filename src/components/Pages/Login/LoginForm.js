import React, { Component } from 'react'
// import TokenService from '../../services/token-service'
// import AuthApiService from '../../services/auth-api-service'
import { Button, InputGroup } from '../../Utils/Utils'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { 
    userName: '',
    password: '',
    error: null 
  }

  handleSubmitJwtAuth = e => {
    e.preventDefault()
    this.setState({ error: null })
    const { userName, password } = this.state
    console.log(userName)
    console.log(password)
    
    // AuthApiService.postLogin({
    //   user_name: user_name.value,
    //   password: password.value,
    // })
    // .then(res => {
    //   user_name.value = ''
    //   password.value = ''
    //   TokenService.saveAuthToken(res.authToken)
    //   this.props.onLoginSuccess()
    // })
    // .catch(res => {
    //   this.setState({ error: res.error })
    // })
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
    const { error, userName, password } = this.state
    const inputs = [
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
      }
    ]
    return (
      <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
        <fieldset>
          <legend>Sign In</legend>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>

          {this.createInputs(inputs)}
          
          <Button type='submit'>Login</Button>
        </fieldset>
      </form>
    )
  }
}
