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
    return (
      <div>
        <h3>All Users</h3>
        <ul dense>
         {this.state.users.map((item, i) => {
          return <li to={"/user/" + item._id} key={i}>
                    <button>
                      <li primary={item.name}/>
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