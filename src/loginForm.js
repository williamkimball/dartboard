import React, { Component } from "react";
import APIHandler from "./APIHandler";

export default class loginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleLogin = event => {
    //Stops default action of form reloading
    event.preventDefault()

    APIHandler.getData(`users?email=${this.state.email}`)
      .then(user => {
        console.log(user)
        if (user.length > 0 && this.state.password === user[0].password) {
          this.setState({ userId: user[0].id })
        } else {
          alert(
            "We're Sorry, it looks like you may have mistyped your email address or password."
          );
        }
      })
      .then(() => {
        const checkbox = document.getElementById("checkbox");
        console.log(checkbox);
        if (checkbox.checked) {
          if (this.state.userId) {
            localStorage.setItem(
              "credentials",
              JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                userId: this.state.userId
              })
              
            );
          }
        } else {
          if (this.state.userId) {
            sessionStorage.setItem(
              "credentials",
              JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                userId: this.state.userId
              })
            );
          }
        }
      }).then(() => {this.props.history.push("/Dashboard");});
      
  };
  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign-In</h1>
        <label htmlFor="inputEmail">Email Address</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          id="email"
          placeholder="Email Address"
          required=""
          autoFocus=""
        />
        <label htmlFor="inputPassword">password</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          required=""
        />
        <label>Remember Me</label>
        <input type="checkbox" id="checkbox" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
