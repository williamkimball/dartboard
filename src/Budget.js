//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const Budget = props => {

  return (
    <div className="">
      {
        <div >
          <h5 className="card-title">{props.budget.budgetItemTitle}</h5>
          <p className="mb-2 text-muted">
            Price: {props.budget.budgetItemPrice}
          </p>
          {/* <img src={require('./edtBtn.png')} id="edtBtn"/>
          {props.state.EditForm} */}
        </div>
      }
    </div>
  );
};

export default Budget;