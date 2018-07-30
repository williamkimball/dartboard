import React, { Component } from "react";
import APIHandler from "./APIHandler";
import TripForm from "./TripForm";
import Trip from "./Trip";

import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";

import TripDash from "./TripDash"
// import moment from "moment";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import history from './history';
// import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  state = {
    userName: "",
    tripForm: "",
    startDate: "",
    endDate: "",
    trips: [],
    trip: "",
    tripDash: ""
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
      .then(trip => this.setState({ trips: trip }));
  }

  //  goToTrip = (event) => {
  // // const tripId = event.target.parentNode.id;
  // history.push("/TripDash")
  // this.forceUpdate()
  // // this.props.history.push("/TripDash")

  // }

  goToTrip = (event) => {
    console.log(event.target.parentNode.id)
    this.setState({
      trips: [],
      tripDash:  <TripDash
      //  key={trip.id}
      trip={event.target.parentNode.id}
      // //  goingSomewhere={this.state.goingSomewhere}
      props={this.state.trips}
      // // goToTrip={this.goToTrip}
      // user={this.state.user}
    />
    });
    
     
  };

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-head">
          <button
            className="dashboard-welcome-button pleaseCenter"
            onClick={this.changePressed}
          >
            Add New Trip
          </button>
          <h2 className="dashboard-welcome">
            Welcome to Dartboard, {this.state.userName}!
          </h2>
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
