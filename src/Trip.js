//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React from "react";
// import APIHandler from "./APIHandler";
import { Link } from "react-router-dom";

const Trip = props => {
  console.log(props);
  return (
    <div className="card" id={props.trip.id}>
      {
        <div className="card-body">
          <h5 className="card-title">{props.trip.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.trip.startDate} to {props.trip.endDate}
          </h6>
          <Link
            to={{
              pathname: `/TripDash/${props.trip.id}`
            }} 
          >
            Let's Go!
          </Link>
        </div>
      }
    </div>
  );
};

export default Trip;
