//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const List = props => {
// console.log(props)
  return (
    <div className="card item" id={props.list.id}>
      {
        <div id={props.list.listName}>
        {props.list.listItemContent}
        </div>
      }
      <img
                  src={require("./trash-alt-solid.svg")}
                  id="deleteBtn"
                  alt="delete Trash Can"
                  onClick={props.deleteListItem}
                />
    </div>
  );
};

export default List;