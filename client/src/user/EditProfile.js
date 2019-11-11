import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
 

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({name: data.name, email: data.email})
      }
    })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'userId': data._id, 'redirectToProfile': true})
      }
    })
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }
  render() {
   
    if (this.state.redirectToProfile) {
      return (<Redirect to={'/user/' + this.state.userId}/>)
    }
    return (
      <div>
        <div>
          <h2 type="headline" component="h2" >
            Editar Perfil
          </h2>
          <input id="name" label="Name"  value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <input id="email" type="email" label="Email"  value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <input id="password" type="password" label="Password" value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<h3 component="p" color="error">
              <span color="error">error</span>
              {this.state.error}
            </h3>)
          }
        </div>
        <div>
          <button color="primary" variant="raised" onClick={this.clickSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}



export default EditProfile