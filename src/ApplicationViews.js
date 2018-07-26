import { Route } from "react-router-dom";
import React, { Component } from "react";
import Landing from "./Landing";
import LoginForm from "./loginForm";
import Register from "./register";
import Dashboard from "./Dashboard";


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
            if (this.isAuthenticated()) {
              return <Landing />;
            } else {
              return <LoginForm />;
            }
          }}
        />
        <Route
          exact
          path="/Dashboard"
          render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard />;
            } else {
              return <Landing />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}
