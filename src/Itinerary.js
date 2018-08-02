//William Kimball 2018
//This file builds each itinerary card

import "./Trip.css";
import React from "react";

const Itinerary = props => {

  return (
    <div className="card item">
      {
        <div className="card-body">
          {/* <h5 className="card-title">Flight Name: {props.itinerary.ItineraryName}</h5> */}
          <h6 className="card-subtitle mb-2 text-muted">
          asdf
            {/* Flight Number: {props.itinerary.ItineraryNumber} */}
          </h6>
          <p className="card-subtitle mb-2 ">
            {/* Departure Date: {props.itinerary.ItineraryStartDate} */}
          </p>
          {/* <img src={require('./edtBtn.png')} id="edtBtn"/>
          {props.state.EditForm} */}
        </div>
      }
    </div>
  );
};

export default Itinerary;