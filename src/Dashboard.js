import React, { Component } from "react";
// import APIHandler from "./APIHandler";

export default class Dashboard extends Component {
  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("credentials"));
    if (currentUser === null) {
      currentUser = JSON.parse(sessionStorage.getItem("credentials"));
      currentUser = currentUser.userId;
    } else {
      currentUser = currentUser.userId;
    }
    this.setState({ user: currentUser });
  }

  render() {
    return <React.Fragment />;
  }
}
