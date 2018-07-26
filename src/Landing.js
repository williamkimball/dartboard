import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <button id="linkToLoginForm">
            <Link to={{ pathname: "/loginForm" }}>Login</Link>
          </button>
        </div>

        <div>
          <button id="linkToRegisterForm">
            <Link to={{ pathname: "/register" }}>Register</Link>
          </button>
        </div>
      </React.Fragment>
    );
  }
}
