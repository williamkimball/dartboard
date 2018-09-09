import React, { Component } from "react";
import APIHandler from "./APIHandler";
import {
  Modal,
  ModalBackground,
  ModalCardBody,
  Delete,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Field,
  Label,
  Control,
  Input,
  Icon,
  Button,
  Checkbox
} from "bloomer";
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

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
      password: bcrypt.hashSync(`${this.state.password}`, salt)
    };

    //checks to make sure fields are not empty
    if (
      registerData.name !== "" &&
      registerData.email !== "" &&
      registerData.password !== ""
    ) {
      //gets all users to check if they already exist in the database
      APIHandler.getData("users").then(users => {
        let userExists = false
        users.forEach(user => {
          if (
            user.name === registerData.name ||
            user.email === registerData.email
          ) {
            alert("User already exists");
            userExists = true
          } 
        });
        if (userExists === false) {
                      //if the new user doesn't already exist, it adds the new user to the database, and redirects to the login form
                      this.turnInactive();
                      APIHandler.addData("users", registerData).then(() => {
                        alert("Registration Successful");
                        this.props.history.push("/Dashboard");
                      });
        }
      });
    } else {
      alert("Please ensure all fields are filled in.");
    }
  };

  turnInactive = () => {
    document.querySelector(".modal").classList.remove("is-active");
  };
  render() {
    return (
      <Modal>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Register</ModalCardTitle>
            <Delete onClick={this.turnInactive} />
          </ModalCardHeader>
          <ModalCardBody>
            <Field>
              <Label>Name:</Label>
              <Control>
                <Input
                  placeholder="Jim"
                  onChange={this.handleFieldChange}
                  type="text"
                  id="name"
                  required
                  autoFocus=""
                />
              </Control>
            </Field>
            <Field>
              <Label>Email:</Label>
              <Control>
                <Input
                  placeholder="Person@Place.com"
                  onChange={this.handleFieldChange}
                  type="email"
                  id="email"
                  required
                  autoFocus=""
                />
              </Control>
            </Field>

            <Field>
              <Label>Password:</Label>
              <Control>
                <Input
                  placeholder="Password"
                  onChange={this.handleFieldChange}
                  type="password"
                  id="password"
                  required
                />
                <Icon isSize="small" isAlign="left">
                  <span className="fa fa-user" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox id="checkbox"> Remember Me </Checkbox>
              </Control>
            </Field>

            <Field isGrouped>
              <Control>
                <Button isColor="primary" onClick={this.handleRegister}>
                  Submit
                </Button>
              </Control>
              <Control onClick={this.turnInactive}>
                <Button>Cancel</Button>
              </Control>
            </Field>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
}
