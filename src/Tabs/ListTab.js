//William Kimball 2018
//This file builds each flight card

import "./../Trip.css";
import React, { Component } from "react";
import {Tab} from "bloomer";

export default class ListTab extends Component {

  render() {
    return (
      <Tab onClick={this.props.pillListener}>
        <a
          className="nav-link"
          id={this.props.tab.listName + "-tab"}
          data-toggle="tab"
          role="tab"
          aria-controls={this.props.tab.listName + "s"}
          aria-selected="false"
        >
          {this.props.tab.listName}
        </a>
      </Tab>
    );
  }
}
