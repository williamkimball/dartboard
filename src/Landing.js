import React, { Component } from "react";
import { Card, CardContent, Title, Content, Button, Image } from "bloomer";
import LoginForm from "./loginForm";
import RegisterForm from "./register";

export default class Login extends Component {
  state = {
    LoginModal: "",
    RegisterModal: ""
  };
  loginModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState({ RegisterModal: "", LoginModal: "" }, () => {
        this.setState({ LoginModal: <LoginForm {...this.props} /> }, () => {
          document.querySelector(".modal").classList.add("is-active");
        });
      });
    } else {
      this.setState({ LoginModal: <LoginForm {...this.props} /> }, () => {
        document.querySelector(".modal").classList.add("is-active");
      });
    }
  };

  registerModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState({ RegisterModal: "", LoginModal: "" }, () => {
        this.setState(
          { RegisterModal: <RegisterForm {...this.props} /> },
          () => {
            document.querySelector(".modal").classList.add("is-active");
          }
        );
      });
    } else {
      this.setState({ RegisterModal: <RegisterForm {...this.props} /> }, () => {
        document.querySelector(".modal").classList.add("is-active");
      });
    }
  };

  render() {
    return (
      <Card>
        <Title>Welcome to DartBoard!</Title>
        <CardContent>
          
          <Content>
            <div>
              <Button
                isColor="info"
                id="linkToLoginForm"
                onClick={this.loginModal}
              >
                Login
              </Button>
            </div>
            <Image isSize="256x256" src={require('././DartBoardRed.png')}/>
            <div>
              <Button
                isColor="info"
                id="linkToRegisterForm"
                onClick={this.registerModal}
              >
                Register
              </Button>
            </div>
          </Content>
        </CardContent>
        {this.state.LoginModal}
        {this.state.RegisterModal}
      </Card>
    );
  }
}
