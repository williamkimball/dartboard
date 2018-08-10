//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const ListTab = props => {
// console.log("yo")

  return (
    <li className="nav-item" onClick={props.pillListener}>
    <a
      className="nav-link"
      id={props.tab.listName + "-tab"}
      data-toggle="tab"
      href={"#" + props.tab.listName}
      role="tab"
      aria-controls={props.tab.listName + "s"}
      aria-selected="false"
    >
      {props.tab.listName}
    </a>
  </li>
  );
};

export default ListTab;