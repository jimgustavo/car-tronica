import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'


class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      redirectToSignin: false
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }
  render() {
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div  elevation={4}>
        <h2 type="title">
          Profile
        </h2>
        <ul>
          <li>
            <div primary={this.state.user.name} secondary={this.state.user.email}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id && 
              (<div>
                <Link to={"/user/edit/" + this.state.user._id}>
                  <button aria-label="Edit" color="primary">
                     Editar
                  </button>
                </Link>
                <p userId={this.state.user._id}/>
              </div>)
            }
          </li>
          <br/>
          <li>
            <p primary={"Joined: " + (
              new Date(this.state.user.created)).toDateString()}/>
          </li>
        </ul>
      </div>
    )
  }
}

export default Profile