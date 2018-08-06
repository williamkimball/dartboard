//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const List = props => {
// console.log(props)
  return (
    <div className="card item">
      {
        <div id={props.list.listName}>
        {props.list.listItemContent}
        </div>
      }
    </div>
  );
};

export default List;