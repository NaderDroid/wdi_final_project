import React , {Component} from 'react'
import {showUser} from "./auth/api";

class UserPage extends Component {

    state = {
        user : this.props.user
    }
   componentDidMount() {
        //console.log(this.state.user._id)

        showUser(this.state.user)
   }

    render() {
        return (
                <div>
                <h1>Welcome, Your name goes here</h1>
                </div>
        )
    }
}
export default UserPage;
