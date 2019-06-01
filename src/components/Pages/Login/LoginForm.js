import React, { Component } from 'react'
// import TokenService from '../../services/token-service'
// import AuthApiService from '../../services/auth-api-service'
import { Button } from '../../Utils/Utils'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = e => {
    e.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = e.target
    console.log(user_name.value)
    console.log(password.value)
    
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

  render() {
    const { error } = this.state
    return (
      <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
        <fieldset>
          <legend>Sign In</legend>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
          <p>
            <label htmlFor='LoginForm__user_name'>User name</label>
            <input type="text" name='user_name' id='LoginForm__user_name' required />
          </p>
          <p>
            <label htmlFor='LoginForm__password'>Password</label>
            <input type="password" name='password' id='LoginForm__password' required />
          </p>
          <Button type='submit'>Login</Button>
        </fieldset>
      </form>
    )
  }
}
