//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React from "react";

// import { Link } from "react-router-dom";
// import EditTripForm from "./EditTripForm";

const Trip = props => {
  // let editTrip = (event) => {
  //    console.log(event.target.parentNode);
  //    console.log(this.props)
  //   //  this.props.state.EditForm =
  //   //      <EditTripForm
  //   //      />
  //  }

   return (

    <div className="card item" id={props.trip.id} onClick={props.goToTrip}>
      {
        <div className="card-body">
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
