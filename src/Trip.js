//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React from "react";

const Trip = props => {

   return (

    <div className="card item" >
      {
        <div className="card-body" id={props.trip.id} onClick={props.goToTrip}>
          <h5 className="card-title">{props.trip.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.trip.startDate} to {props.trip.endDate}
          </h6>
          {/* <img src={require('./edtBtn.png')} id="edtBtn"/>
          {props.state.EditForm} */}
        </div>
      }
    </div>
  );
};

export default Trip;
