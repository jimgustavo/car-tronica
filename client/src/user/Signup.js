import React, {Component} from 'react'
import {create} from './api-user.js'

class Signup extends Component {
  state = {
      name: '',
      password: '',
      email: '',
      open: false,
      error: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
      }
    })
  }

  render() {
    return (
      <div className="SignUp">
      <h2> Bienvenido a CarStore, registrate porfavor: </h2>
      <form>
        <br />
        <input
          className="username"
          type="text"
          placeholder="Usuario"
          value={this.state.name} 
          onChange={this.handleChange('name')}
        />
        <br />
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
        <button type="submit" className="buttonSignup" onClick={this.clickSubmit}>
          Registrar
        </button>
      </form>
    </div>
     )
  }
}


export default Signup;