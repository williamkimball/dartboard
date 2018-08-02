//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const Budget = props => {

  return (
    <div className="card item">
      {
        <div className="card-body">
          <h5 className="card-title">Budget Item: {props.budget.budgetItemTitle}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Price: {props.budget.budgetItemPrice}
          </h6>
          {/* <img src={require('./edtBtn.png')} id="edtBtn"/>
          {props.state.EditForm} */}
        </div>
      }
    </div>
  );
};

export default Budget;