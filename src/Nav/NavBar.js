import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./NavBar.css";
// import APIManager from "./../APIHandler";
// import { Redirect } from "react-router-dom";
// import history from './../history'
import { Nav, Columns, Column } from "bloomer";

export default class NavBar extends Component {
  state = {
    search: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  goHome = () => {
    this.props.history.push(`/`)
  }

  render() {
    return (
      <Nav isVCentered>
        <Columns isVCentered>
          <Column>
            <h2>DartBoard</h2>
          </Column>
        </Columns>
      </Nav>
    );
  }
}
