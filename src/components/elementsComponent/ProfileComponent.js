  import React, { Component } from "react";
  import { Redirect } from "react-router-dom";
  import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";

  export default class Profile extends Component {
    constructor(props) {
      super(props);

      this.state = {
        redirect: null,
        userReady: false,
        currentUser: { username: "" },
        userInfo: {},
      };
    }

    componentDidMount() {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) this.setState({ redirect: "/" });
      this.setState({ currentUser: currentUser, userReady: true })
      userService.getUserInfo(currentUser.username).then(res =>{
        this.setState({userInfo: res.data});
        console.log(res.data);
      });
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

      const { currentUser } = this.state;

      return (
        <div className="container">
          {(this.state.userReady) ?
          <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>First name:</strong>{" "}
            {this.state.userInfo!=null?this.state.userInfo.firstName:"John"}
          </p>
          <p>
            <strong>Last name:</strong>{" "}
            {this.state.userInfo!=null?this.state.userInfo.lastName:"Doe"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {this.state.userInfo!=null?this.state.userInfo.phone:"00000000000"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>: null}
        </div>
      );
    }
  }