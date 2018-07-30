import React, { Component } from "react";
import APIHandler from "./APIHandler";
import TripForm from "./TripForm";
import Trip from "./Trip";

import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";

import TripDash from "./TripDash";
// import moment from "moment";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import history from './history';
// import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  state = {
    userName: "",
    dashHead: "",
    tripForm: "",
    startDate: "",
    endDate: "",
    trips: [],
    trip: "",
    tripDash: "",
    newTripButton: (
      <button
        className="dashboard-welcome-button pleaseCenter"
        onClick={this.changePressed}
      >
        Add New Trip
      </button>
    )
  };

  changePressed = () => {
    if (this.state.tripForm === "") {
      this.setState({
        tripForm: (
          <TripForm
            addNewTrip={this.addNewTrip}
            handleFieldChange={this.handleFieldChange}
            handleChange={this.handleChange}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        )
      });
    } else {
      this.setState({
        tripForm: ""
      });
    }
  };

  addNewTrip = event => {
    event.preventDefault();
    // let timestamp = Moment().format("YYYY-MM-DD hh:mm:ss a");

    // Add new trips to the API
    fetch(`http://localhost:5002/trips?_expand=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        title: this.state.title,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        userId: this.state.user
      })
    })
      // When POST is finished, retrieve the new list of trips
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          tripForm: ""
        });
        alert("Added New Article Sucessfully");
        return fetch("http://localhost:5002/trips?_expand=user");
      })
      // Once the new array of trips is retrieved, set the state
      .then(e => e.json())
      .then(trip => {
        this.setState({
          trips: trip
        });
      });
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("credentials"));
    if (currentUser === null) {
      currentUser = JSON.parse(sessionStorage.getItem("credentials"));
      currentUser = currentUser.userId;
    } else {
      currentUser = currentUser.userId;
    }
    this.setState({ user: currentUser });
    APIHandler.getUserName(currentUser).then(username => {
      this.setState({ userName: username });
    });
    fetch("http://localhost:5002/trips?_expand=user")
      .then(e => e.json())
      .then(trip =>
        this.setState({
          trips: trip,
          dashHead: `Welcome to Dartboard, ${this.state.userName}!`
        })
      );
  }

  goToTrip = event => {
    console.log(event.target.parentNode.id);

    APIHandler.getData("trips", event.target.parentNode.id).then(trip => {
      this.setState({
        newTripButton: "",
        thisTrip: trip,
        dashHead: `${trip.title}`,
        dashHeadDates: `${trip.startDate} - ${trip.endDate}`,
        trips: [],
        tripDash: (
          <TripDash
            // trip={trip}
            props={trip}
          />
        )
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-nav">
          {this.state.newTripButton}
          <h2 className="dashboard-head">{this.state.dashHead}</h2>
          <h4 className="dashboard-dates">{this.state.dashHeadDates}</h4>
        </div>
        <div className="dashboard-tripCards">
          {this.state.tripForm}
          {this.state.trips.map(trip => (
            <Trip
              key={trip.id}
              trip={trip}
              goingSomewhere={this.state.goingSomewhere}
              props={this.props}
              goToTrip={this.goToTrip}
              user={this.state.user}
            />
          ))}
          {this.state.tripDash}
        </div>
      </React.Fragment>
    );
  }
}
