import { Route } from "react-router-dom";
import React, { Component } from "react";
import Landing from "./Landing";
import LoginForm from "./loginForm";
import Register from "./register";

export default class ApplicationViews extends Component {
  isAuthenticated = () =>
    localStorage.getItem("credentials") !== null ||
    sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <React.Fragment>
        <Route path="/Register" component={Register} />
        <Route path="/loginForm" component={LoginForm} />

        <Route
          exact
          path="/"
          render={props => {
            return <Landing />;
          }}
        />
      </React.Fragment>
    );
  }
}
