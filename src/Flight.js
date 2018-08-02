//William Kimball 2018
//This file builds each flight card

// import "./Trip.css";
import React from "react";

// import { Link } from "react-router-dom";
// import EditFlightForm from "./EditFlightForm";

const Flight = props => {
  // let editTrip = (event) => {
  //    console.log(event.target.parentNode);
  //    console.log(this.props)
  //   //  this.props.state.EditForm =
  //   //      <EditTripForm
  //   //      />
  //  }

   return (
    
    <div className="card item" >
      {
        <div className="card-body"  >
          <h5 className="card-title">Flight Name: {props.flight.FlightName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
          Flight Number: {props.flight.FlightNumber}
          </h6>
          <h6>{props.flight.FlightOrigin} to {props.flight.FlightDestination}</h6>
          <p>Departure Date: {props.flight.FlightStartDate}</p>
          <p>Return Date: {props.flight.FlightEndDate}</p>
          {/* <img src={require('./edtBtn.png')} id="edtBtn"/>
          {props.state.EditForm} */}
        </div>
      }
    </div>
  );
};

export default Flight;
