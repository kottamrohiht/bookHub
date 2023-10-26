import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    errMsg: '',
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state

    if (userName === '' || password === '') {
      this.setState({
        errMsg: 'Username or Password is Invalid',
      })
    } else {
      const userObj = {
        username: userName,
        password,
      }

      const loginApi = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userObj),
      }

      const response = await fetch(loginApi, options)
      if (response.ok) {
        const data = await response.json()
        const jwtToken = data.jwt_token
        this.setState({
          userName: '',
          password: '',
        })

        this.loginSuccess(jwtToken)
      } else {
        this.setState({
          errMsg: `Username or Password is Invalid`,
        })
      }
    }
  }

  onChangeUsername = event => {
    this.setState({
      userName: event.target.value,
    })
  }

  onChangePasswoed = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderForm = () => {
    const {userName, password, errMsg} = this.state
    const bookHub =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1698247802/gbvjhyvjvls6ymql2wgt.png'

    return (
      <form onSubmit={this.submitForm} className="form">
        <img src={bookHub} alt="book hub" className="book-hub" />
        <label htmlFor="user-name" className="user-name">
          Username*
        </label>
        <input
          type="text"
          id="user-name"
          value={userName}
          onChange={this.onChangeUsername}
          className="input-el"
          placeholder="Username "
        />

        <label htmlFor="user-password" className="user-name">
          {' '}
          Password*{' '}
        </label>
        <input
          type="password"
          id="user-password"
          value={password}
          onChange={this.onChangePasswoed}
          className="input-el"
          placeholder="password "
        />

        <p className="errMsg"> {errMsg} </p>

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const loginImg =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1698247805/m4uact3ak6yu00oxnolv.jpg'

    const loginSmImg =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1698247803/q5nxugnbjlwvf3ejq6ho.png'

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-img-container">
          <img src={loginImg} alt="login img" className="login-img" />
          <img src={loginSmImg} alt="login img" className="login-sm-img" />
        </div>
        <div className="form-container">{this.renderForm()}</div>
      </div>
    )
  }
}

export default Login
