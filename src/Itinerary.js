//William Kimball 2018
//This file builds each itinerary card

import "./Trip.css";
import React, { Component } from "react";
import { Button, Column } from "bloomer";
import ItineraryModal from "./DisplayModals/ItineraryModal";
// import APIHandler from "./APIHandler";

//This function creates the Itinerary Modal that pops up when the "add new Itinerary item" button is pressed.

export default class Itinerary extends Component {
  state = {
    ItineraryModal: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  //this function handles all of the functionality related to adding a new itinerary to the database and then redrawing the page to create a card for it.
  addNewItinerary = event => {
    event.preventDefault();

    // Add new itinerary item to the API
    fetch(`http://localhost:5002/itinerary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        ItineraryName: this.state.ItineraryName,
        ItineraryDescription: this.state.ItineraryDescription,
        // FlightEndDate: this.state.FlightEndDate,
        // FlightNumber: this.state.FlightNumber,
        // FlightOrigin: this.state.FlightOrigin,
        // FlightDestination: this.state.FlightDestination,
        tripId: this.props.state.tripInfo.id
      })
    })
      // When POST is finished, retrieve the new list of itinerary items
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          ItineraryModal: ""
        });
        alert("Added New Itinerary Item Sucessfully");
        return fetch("http://localhost:5002/itinerary");
      })
      .then(
        //this the username, and then sets the state of itinerary to be equal to a list of itineraries that is filtered by the trip number
        () => {
          this.props.getTripInfo(this.props.state.tripInfo.id);
        }
      );
  };

  ItineraryModal = () => {
    //checks to see if the modal is in state
    if (document.querySelector(".modal") !== null) {
      this.setState(
        { FlightModal: "", ItineraryModal: "", BudgetModal: "" },
        () => {
          this.setState(
            {
              ItineraryModal: (
                <ItineraryModal
                  {...this.props}
                  addNewItinerary={this.addNewItinerary}
                  handleFieldChange={this.handleFieldChange}
                />
              )
            },
            () => {
              document.querySelector(".modal").classList.add("is-active");
            }
          );
        }
      );
    } else {
      this.setState(
        {
          ItineraryModal: (
            <ItineraryModal
              {...this.props}
              addNewItinerary={this.addNewItinerary}
              handleFieldChange={this.handleFieldChange}
            />
          )
        },
        () => {
          document.querySelector(".modal").classList.add("is-active");
        }
      );
    }
  };

  render() {
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
        <Button
          isColor="info"
          render={props => (
            <Column hasTextAlign="centered">
              <p {...props} onClick={this.ItineraryModal}>
                New Itinerary Item
              </p>
            </Column>
          )}
        />
        {this.state.ItineraryModal}
      </div>
    );
  }
}

// export default Itinerary;
