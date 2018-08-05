//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";

const Flight = props => {


  return (
    <div className="card item">
      {
        <div className="card-body" id={props.flight.id}>
          <h5 className="card-title">Flight Name: {props.flight.FlightName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Flight Number: {props.flight.FlightNumber}
          </h6>
          <h6 className="card-subtitle mb-2 ">
            {props.flight.FlightOrigin} to {props.flight.FlightDestination}
          </h6>
          <p className="card-subtitle mb-2 ">
            Departure Date: {props.flight.FlightStartDate}
          </p>
          <p className="card-subtitle mb-2 ">
            Return Date: {props.flight.FlightEndDate}
          </p>
          <img src={require("./edit-solid.svg")} id="edtBtn" onClick={props.editFlight}/>
          <img
            src={require("./trash-alt-solid.svg")}
            id="deleteBtn"
            onClick={props.deleteFlightItem}
          />
        </div>
      }
      {props.editFlightModal}
    </div>
  );
};

export default Flight;
