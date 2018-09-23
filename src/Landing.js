import React, { Component } from "react";
import {
  Card,
  CardContent,
  Title,
  Content,
  Button,
  Image,
  Columns,
  Column,
  Tile,
  Box,
  Container
} from "bloomer";
import LoginForm from "./loginForm";
import RegisterForm from "./register";
import apiKeys from "./apiItems/APIKeys";

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

  getImage = async destination => {
    var s = destination;
    var n = s.indexOf(",");
    s = s.substring(0, n != -1 ? n : s.length);
    // console.log(s);

    const json = await fetch(
      `https://api.unsplash.com/photos/random/?query=travel&client_id=${apiKeys.UnsplashKey()}`
    )
      .then(response => response.json())
      .then(image => {
        if (image.urls) {
          this.setState({
            image: image,
            imagePic: image.urls.regular,
            imageUser: image.user.name,
            imageUserLink: image.user.links.html,
            imageLink: image.links.html,
            imageAlt: image.description
          });
        }
      });
  };

  componentDidMount() {
    this.getImage;
  }

  render() {
    return (
      <Column isVCentered="true">
        <Tile isAncestor>
          <Tile isParent>
            <Tile
              isChild
              render={props => (
                <Box {...props}>
                  <Title hasTextAlign="center">Welcome to DartBoard!</Title>
                  <p>
                    DartBoard is a travel planning app that users can utilize as
                    a central repository for information related to their travel
                    plans.
                  </p>
                  <p>To get started, Login or Register for a new account.</p>
                </Box>
              )}
            />
            <Tile isSize={4} isVertical isParent>
              <Tile
                isChild
                render={props => (
                  <Box {...props}>
                    <Title>Login</Title>
                    <Button
                      isColor="info"
                      id="linkToLoginForm"
                      onClick={this.loginModal}
                    >
                      Login
                    </Button>
                  </Box>
                )}
              />
              <Tile
                isChild
                render={props => (
                  <Box {...props}>
                    <Title>Register</Title>
                  {/* <Image isPulled="right" id="loginLogo" isSize="96x96" src={require('././DartBoardRed.png')}/> */}
                 <Button
                   isColor="info"
                   id="linkToRegisterForm"
                   onClick={this.registerModal}
                 >
                   Register
                 </Button>
                  </Box>
                )}
              />
            </Tile>
          </Tile>
        </Tile>
               {this.state.LoginModal}
             {this.state.RegisterModal}
      </Column>
      // <Columns>
      //   <Column isVCentered="true">
      //     <Title hasTextAlign="center">Welcome to DartBoard!</Title>
      //     <CardContent hasTextAlign="right">
      //       <Content>
      //         <div>
      //           <Button
      //             isColor="info"
      //             id="linkToLoginForm"
      //             onClick={this.loginModal}
      //           >
      //             Login
      //           </Button>
      //           {/* <Image isPulled="right" id="loginLogo" isSize="96x96" src={require('././DartBoardRed.png')}/> */}
      //           <Button
      //             isColor="info"
      //             id="linkToRegisterForm"
      //             onClick={this.registerModal}
      //           >
      //             Register
      //           </Button>
      //         </div>
      //       </Content>
      //       {this.state.LoginModal}
      //       {this.state.RegisterModal}
      //     </CardContent>
      //   </Column>
      // </Columns>
    );
  }
}
