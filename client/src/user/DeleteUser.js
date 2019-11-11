import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

class DeleteUser extends Component {
  state = {
    redirect: false,
    open: false
  }
  clickButton = () => {
    this.setState({open: true})
  }
  deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('deleted'))
        this.setState({redirect: true})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }
    return (
    <span>
      <button aria-label="Delete" onClick={this.clickButton} color="secondary">
        Borrar Usuario
      </button>

      <div open={this.state.open} onClose={this.handleRequestClose}>
        <h2>{"Delete Account"}</h2>
        <div>
          <h4>Confirm to delete your account.</h4>
        </div>
        <div>
          <button onClick={this.handleRequestClose} color="primary">
            Cancel
          </button>
          <button onClick={this.deleteAccount} color="secondary" autoFocus="autoFocus">
            Confirm
          </button>
        </div>
      </div>
    </span>)
  }
}

export default DeleteUser