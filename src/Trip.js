//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React from "react";
import APIHandler from "./APIHandler";
import { Button } from "bloomer";

// import { Link } from "react-router-dom";
// import EditTripForm from "./EditTripForm";

const Trip = props => {
  // const deleteTrip = () => {

  // };

  return (
    <div className="card item">
      {
        <div className="card-body" id={props.trip.id}>
          <h5 className="card-title">{props.trip.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.trip.startDate} to {props.trip.endDate}
          </h6>
          <img
            src={require("./edit-solid.svg")}
            id="edtBtn"
            onClick={props.editTrip}
          />
          <img
            src={require("./trash-alt-solid.svg")}
            id="deleteBtn"
            onClick={props.deleteTrip}
          />
          {props.editTripModal}
          <Button isColor="light" onClick={props.goToTrip}>
            {" "}
            Go to Trip
          </Button>
        </div>
      }
    </div>
  );
};

export default Trip;
