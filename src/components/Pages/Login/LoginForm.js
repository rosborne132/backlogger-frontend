import React, { Component } from 'react'
import { Redirect } from 'react-router'
import TokenService from '../../../services/token-service'
import AuthApiService from '../../../services/auth-api-service'

import formStyles from "../../StyledComponents/Form.modules.css"
import { InputGroup } from '../../Utils/Utils'

import UserContext from '../../../context/UserContext'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  
  static contextType = UserContext

  state = { 
    userName: "",
    password: "",
    error: null ,
    redirect: false 
  }

  handleSubmitJwtAuth = e => {
    e.preventDefault()
    this.setState({ error: null })
    const { userName, password } = this.state
    const { updateLoginStatus } = this.context

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(userName, password)
    )
    
    AuthApiService.postLogin({
      user_name: userName,
      password: password,
    })
    .then(res => {
      TokenService.saveAuthToken(res.authToken)
      this.setState({ userName: "", password: "", redirect: true })
      this.props.onLoginSuccess()
      updateLoginStatus()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  
  createInputs = inputs => {
    return inputs.map(input => {
      return (
        <InputGroup 
          key={input.inputID}
          labelFor={input.labelFor}
          labelText={input.labelText}
          labelClass={input.labelClass}
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
    const { error, userName, password, redirect } = this.state
    const inputs = [
      {
        labelFor: 'RegistrationForm__user_name',
        labelText: 'User Name',
        labelClass: 'flex ml4 pv1',
        inputType: 'text',
        inputName: 'userName',
        inputID: 'RegistrationForm__user_name',
        inputValue: userName
      },
      {
        labelFor: 'RegistrationForm__password',
        labelText: 'Password',
        labelClass: 'flex ml4 pv1',
        inputType: 'password',
        inputName: 'password',
        inputID: 'RegistrationForm__password',
        inputValue: password
      }
    ]

    if (redirect) {
      return <Redirect to='/app'/>;
    }

    return (
      <form style={formStyles.form} className="measure-narrow mv3 pa2 shadow-3 center" onSubmit={this.handleSubmitJwtAuth}>
        <fieldset style={formStyles.fieldset} className="bn"> 
          <legend style={formStyles.legend} className="f3 code">Sign In</legend>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>

          {this.createInputs(inputs)}
          
          <button style={formStyles.button} className="code ph3 pv2 mb2 dib" type='submit'>Login</button>
        </fieldset>
      </form>
    )
  }
}
