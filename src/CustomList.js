//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const List = props => {
console.log(props)
  return (
    <div className="card item">
      {
        <div id={props.list.listName}>
          {/* <h5 className="card-title">{props.list.listName}</h5> */}
          {/* <p className="mb-2 text-muted">
            Price: {props.budget.budgetItemPrice}
          </p> */}
          {/* <img src={require('./trash-alt-solid.svg')} id="deleteBtn" alt="delete Trash Can"/> */}
        </div>
      }
    </div>
  );
};

export default List;