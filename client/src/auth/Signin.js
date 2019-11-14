import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'
import {Link} from 'react-router-dom'

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }

  clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
      <div className="SignIn">
        <h3> Hola como estas? es bueno verte de nuevo! </h3>
        <form onSubmit={this.handleSubmit}>
          <br />
          {this.state.error}
          <br />
          <input
            className="email"
            type="email"
            placeholder="Email"
            value={this.state.email} 
            onChange={this.handleChange('email')}
            />
          <br />
          <br />
          <input
            className="password"
            type="password"
            placeholder="Contraseña"
            value={this.state.password} 
            onChange={this.handleChange('password')}
            />
          <br />
          <br />
          <button className="buttonLogIn" onClick={this.clickSubmit}>Ingresar</button>
        </form>
        <Link to="/signup">  
              Registrarme
        </Link>
      </div>
    )
  }
}



export default Signin