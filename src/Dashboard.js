import React, { Component } from "react";
import APIHandler from "./APIHandler";
import TripForm from "./TripForm";
import Trip from "./Trip";

import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "bloomer";

import TripDash from "./TripDash";

export default class Dashboard extends Component {
  state = {
    userName: "",
    dashHead: "",
    tripForm: "",
    editTrip: "",
    startDate: "",
    endDate: "",
    trips: [],
    trip: "",
    tripDash: "",
    EditForm: ""
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

  // editTrip = event => {
  //   console.log(event.target.parentNode);
  //   this.setState({
  //     EditForm: (
  //       <EditTripForm
  //         handleFieldChange={this.handleFieldChange}
  //         handleChange={this.handleChange}
  //         startDate={this.state.startDate}
  //         endDate={this.state.endDate}
  //         currentInfo={this.state}
  //       />
  //     )
  //   });
  // };

  goToTrip = event => {
    if (event.target.id === "edtBtn") {
      // this.editTrip;
    } else {
      // if (event.target)
      APIHandler.getData("trips", event.target.parentNode.id)
        .then(trip => {
          this.setState({
            newTripButton: "",
            thisTrip: trip,
            dashHead: `${trip.title}`,
            dashHeadDates: `${trip.startDate} - ${trip.endDate}`,
            trips: [],
            tripDash: <TripDash props={trip} />
          });
        })
        .then(
          this.props.history.push(`/TripDash/${event.target.parentNode.id}`)
        );
    }
  };

  render() {
    return (
      <React.Fragment>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column">
                  <h1 className="title">{this.state.dashHead}</h1>
                  <h2 className="subtitle">{this.state.dashHeadDates}</h2>
                </div>
                <Button isColor="info"
                  className="dashboard-welcome-button pleaseCenter"
                  onClick={this.changePressed}
                >
                  Add New Trip
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-tripCards">
          {this.state.tripForm}
          {this.state.trips.map(trip => (
            <Trip
              key={trip.id}
              trip={trip}
              editTrip={this.editTrip}
              props={this.props}
              goToTrip={this.goToTrip}
              user={this.state.user}
              state={this.state}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
