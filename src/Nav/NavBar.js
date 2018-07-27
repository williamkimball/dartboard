import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./NavBar.css";
// import APIManager from "./../APIHandler";
// import { Redirect } from "react-router-dom";
// import history from './../history'

export default class NavBar extends Component {
  state = {
    search: ""
  };


  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };


  render() {

    return (
      <nav>
      <h2>Dartboard</h2>
      </nav>
    );
  }
}
