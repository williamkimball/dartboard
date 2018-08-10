//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";
import {Card, CardContent} from "bloomer";

const Budget = props => {

  return (
    <Card className="budget-card-content">
      {
        <CardContent id={props.budget.id} className="">
          <h5 className="card-title" >{props.budget.budgetItemTitle}</h5>
          <p className="mb-2 text-muted">
            Price: {props.budget.budgetItemPrice}
          </p>
          <img src={require('./trash-alt-solid.svg')} id="deleteBtn" onClick={props.deleteBudgetItem} alt="delete Trash Can"/>
        </CardContent>
      }
    </Card>
  );
};

export default Budget;