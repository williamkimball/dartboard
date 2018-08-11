import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./NavBar.css";
// import APIManager from "./../APIHandler";
// import { Redirect } from "react-router-dom";
// import history from './../history'
import { Image, Nav, NavItem, Columns, Column } from "bloomer";

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
      <Nav isVCentered>
        {/* <Image isSize="128x128" src={require('../DartBoardRed.png')}/> */}
        <Columns isVCentered>
          <Column>
            <h2>DartBoard</h2>
          </Column>
          {/* <Column hasTextAlign="right">
            <p id="homebutton">Home</p>
          </Column> */}
        </Columns>
      </Nav>
    );
  }
}
