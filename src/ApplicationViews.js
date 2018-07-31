import { Route } from "react-router-dom";
import React, { Component } from "react";
import Landing from "./Landing";
import LoginForm from "./loginForm";
import Register from "./register";
import Dashboard from "./Dashboard";
import TripDash from "./TripDash"
// import history from './history';

export default class ApplicationViews extends Component {
  isAuthenticated = () =>
    localStorage.getItem("credentials") !== null ||
    sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <React.Fragment >
        <Route exact path="/Register" component={Register} />
        <Route exact path="/loginForm" component={LoginForm} />

        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              
              return <Landing {...props}/>;
            } else {
              return <LoginForm {...props}/>;
            }
          }}
        />
        <Route
          exact
          path="/Dashboard"
          render={props => {
            if (this.isAuthenticated()) {
              return <Dashboard {...props}/>;
            } else {
              return <Landing {...props}/>;
            }
          }}
        />
        <Route
          
          path="/TripDash/:anumber"
          render={props => {
            if (this.isAuthenticated()) {
              return <TripDash {...props}/>;
            } else {
              return <Landing {...props}/>;
            }
          }}
        />
      </React.Fragment>
    );
  }
}
