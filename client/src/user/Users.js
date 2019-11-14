import React, {Component} from 'react'
import {list} from './api-user.js'

class Users extends Component {
  state = {
      users: []
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }
  render() {
    console.log(this.state.users);
    return (
      <div>
        <h3>All Users</h3>
        <ul>
         {this.state.users.map((item) => {
          return <li>
                    <button>
                      <li>{item.name}</li>
                    </button>
                 </li>
               })
             }
        </ul>
      </div>
    )
  }
}

export default Users