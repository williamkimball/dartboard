//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React from "react";
import APIHandler from "./APIHandler"

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

  const deleteTrip = () => {
    return fetch(`http://localhost:5002/trips/${props.trip.id}`, {
      method: "DELETE"
    });
  }

   return (

    <div className="card item" >
      {
        <div className="card-body" id={props.trip.id} onClick={props.goToTrip}>
          <h5 className="card-title">{props.trip.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.trip.startDate} to {props.trip.endDate}
          </h6>
          <img src={require('./edit-solid.svg')} id="edtBtn"/>
          {props.state.EditForm}
          <img src={require('./trash-alt-solid.svg')} id="deleteBtn" onClick={deleteTrip}/>
        </div>
      }
    </div>
  );
};

export default Trip;
