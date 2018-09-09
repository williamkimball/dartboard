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
    event.preventDefault();

    APIHandler.getData(`users?email=${this.state.email}`)
      .then(user => {
        console.log(user);
        if (user.length > 0 && bcrypt.compareSync(`${this.state.password}`, hash)) {
          this.setState({ userId: user[0].id });
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
      })
      .then(() => {
        this.props.history.push("/Dashboard");
      });
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
            <ModalCardTitle>Login</ModalCardTitle>
            <Delete onClick={this.turnInactive} />
          </ModalCardHeader>
          <ModalCardBody>
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
                <Button isColor="primary" onClick={this.handleLogin}>
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
