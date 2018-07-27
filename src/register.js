import React, { Component } from "react";
import APIHandler from "./APIHandler";

export default class Register extends Component {
  //Initially declare state, to be modified as the user types presses the register button.
  state = {
    name: "",
    email: "",
    password: ""
  };

  //this function handles all field changes, essentially staging them for when they are needed
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };

  //this function handles all of the heavy lifting when someone clicks the register button. I creates an object to be used later when the API call is made, checks to make sure all fields have information in them, checks to see if the user is unique, adds the new user information to the database, and then redirects to the login page
  handleRegister = e => {
    e.preventDefault();

    let registerData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    //checks to make sure fields are not empty
    if (
      registerData.name !== "" &&
      registerData.email !== "" &&
      registerData.password !== ""
    ) {
      //gets all users to check if they already exist in the database
      APIHandler.getData("users").then(users => {
        users.forEach(user => {
          if (
            user.name === registerData.name ||
            user.email === registerData.email
          ) {
            alert("User already exists");
          } else {
            //if the new user doesn't already exist, it adds the new user to the database, and redirects to the login form
            APIHandler.addData("users", registerData).then(() => {
              alert("Registration Successful");
              this.props.history.push("/loginForm");
            });
          }
        });
      });
    } else {
      alert("Please ensure all fields are filled in.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleRegister}>
        <h4>Please Register Your Info!</h4>

        {/* Field to register username */}
        <label htmlFor="registerUsername">Username:</label>
        <input
          id="name"
          name="registerUsername"
          type="text"
          onChange={this.handleFieldChange}
        />

        {/* Field to register email */}
        <label htmlFor="registerEmail">Email:</label>
        <input
          id="email"
          name="registerEmail"
          type="email"
          onChange={this.handleFieldChange}
        />

        {/* Field to register password */}
        <label htmlFor="registerPassword">Password:</label>
        <input
          id="password"
          name="registerPassword"
          type="password"
          onChange={this.handleFieldChange}
        />

        <input type="submit" />
      </form>
    );
  }
}
