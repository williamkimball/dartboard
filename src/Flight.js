//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React, { Component } from "react";

export default class Flight extends Component {

  turnInactive = () => {
    this.setState({
      FlightModal: ""
    });
  };
  render() {

    return (
      <div className="card item">
        {
          <div className="card-body" id={this.props.flight.id}>
            <h5 className="card-title">
              Flight Name: {this.props.flight.FlightName}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Flight Number: {this.props.flight.FlightNumber}
            </h6>
            <h6 className="card-subtitle mb-2 ">
              {this.props.flight.FlightOrigin} to{" "}
              {this.props.flight.FlightDestination}
            </h6>
            <p className="card-subtitle mb-2 ">
              Departure Date: {this.props.flight.FlightStartDate}
            </p>
            <p className="card-subtitle mb-2 ">
              Return Date: {this.props.flight.FlightEndDate}
            </p>
            <img
              src={require("./edit-solid.svg")}
              id="edtBtn"
              onClick={this.props.editFlight}
              alt="edit pen"
            />
            <img
              src={require("./trash-alt-solid.svg")}
              id="deleteBtn"
              alt="delete Trash Can"
              onClick={this.props.deleteFlightItem}
            />
          </div>
        }
        {this.props.editFlightModal}
      </div>
    );
  }
}
