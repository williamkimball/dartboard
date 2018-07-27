//William Kimball 2018
//This file builds each news item card

import React from "react";
import "./Trip.css";


let goToTrip = (event) => {
console.log(event.target.parentNode.id)
}

const Trip = props => {
  return (
    <div className="card" onClick={goToTrip} id={props.trip.id}>
      {
        <div className="card-body" >
          <h5 className="card-title">{props.trip.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.trip.startDate} to {props.trip.endDate}</h6>
          {/* <p className="card-text">Added by: {props.trip.user.name}</p> */}
        </div>
      }
    </div>
  );
};

export default Trip;
