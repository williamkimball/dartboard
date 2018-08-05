import React, { Component } from "react";
import APIHandler from "./APIHandler";
import TripForm from "./TripForm";
import Trip from "./Trip";

import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "bloomer";

import TripDash from "./TripDash";
import EditTripModal from "./editTripModal";

export default class Dashboard extends Component {
  state = {
    userName: "",
    dashHead: "",
    tripForm: "",
    editTrip: "",
    trips: [],
    trip: "",
    tripDash: "",
    editTripModal: "",
    targInfo: ""
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  TripModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState({ tripForm: "" }, () => {
        this.setState(
          {
            tripForm: (
              <TripForm
                {...this.props}
                addNewTrip={this.addNewTrip}
                handleFieldChange={this.handleFieldChange}
              />
            )
          },
          () => {
            document.querySelector(".modal").classList.add("is-active");
          }
        );
      });
    } else {
      this.setState(
        {
          tripForm: (
            <TripForm
              addNewTrip={this.addNewTrip}
              {...this.props}
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

  addNewTrip = event => {
    event.preventDefault();

    let tripEnd = Date.parse(this.state.endDate);
    let tripStart = Date.parse(this.state.startDate);
    let tripLength = (tripEnd - tripStart) / 86400000;
    console.log(tripLength);

    // Add new trips to the API
    fetch(`http://localhost:5002/trips?_expand=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        title: this.state.tripName,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        tripLength: tripLength,
        userId: this.state.user
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(trip) {
        console.log(trip);
        for (let i = 0; i <= tripLength; i++) {
          fetch(`http://localhost:5002/itinerary`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              tripId: trip.id,
              ItineraryName: `Day ${i + 1}`
            })
          });
        }
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
      .then(
        APIHandler.getUserName(this.state.user).then(username => {
          this.setState({ userName: username }, () => {
            fetch("http://localhost:5002/trips?_expand=user")
              .then(e => e.json())
              .then(trip =>
                this.setState({
                  trips: trip.filter(user => user.userId === this.state.user),
                  dashHead: `Welcome to Dartboard, ${this.state.userName}!`
                })
              );
          });
        })
      );
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  getTripInfoForEdit = () => {
    return APIHandler.getTripData(this.state.targId);
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
      this.setState({ userName: username }, () => {
        fetch("http://localhost:5002/trips?_expand=user")
          .then(e => e.json())
          .then(trip =>
            this.setState({
              trips: trip.filter(user => user.userId === this.state.user),
              dashHead: `Welcome to Dartboard, ${this.state.userName}!`
            })
          );
      });
    });
  }

  editTrip = event => {
    let targId = this.state.targId;
    console.log(targId);
    fetch(`http://localhost:5002/trips/${targId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        title: this.state.tripName,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      })
    }) // When POST is finished, retrieve the new list of trips
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          tripForm: "",
          editTripModal: ""
        });
        alert("Edited Trip Sucessfully");
        return fetch("http://localhost:5002/trips?_expand=user");
      })
      .then(
        APIHandler.getUserName(this.state.user).then(username => {
          this.setState({ userName: username }, () => {
            fetch("http://localhost:5002/trips?_expand=user")
              .then(e => e.json())
              .then(trip =>
                this.setState({
                  trips: trip.filter(user => user.userId === this.state.user)
                })
              );
          });
        })
      )
      .then(() => {
        document.querySelector(".modal").classList.remove("is-active")
      });
  };

  editTripModal = event => {
    let targId = event.target.parentNode.id;

    if (document.querySelector(".modal") !== null) {
      this.setState(
        {
          editTripModal: "",
          tripForm: "",
          targId: targId
        },
        () => {
          this.getTripInfoForEdit(this.state.targId).then(response => {
            this.setState(
              {
                targInfo: { response }
              },
              () => {
                this.setState(
                  {
                    editTrip: (
                      <EditTripModal
                        editTrip={this.editTrip}
                        {...this.props}
                        handleFieldChange={this.handleFieldChange}
                        targId={this.state.targId}
                        targInfo={this.state.targInfo.response}
                      />
                    )
                  },
                  () => {
                    document.querySelector(".modal").classList.add("is-active");
                  }
                );
              }
            );
          });
        }
      );
    } else {
      this.setState(
        {
          tripForm: "",
          targId: targId
        },
        () => {
          this.getTripInfoForEdit(this.state.targId).then(response => {
            this.setState(
              {
                targInfo: { response }
              },
              () => {
                this.setState(
                  {
                    editTrip: (
                      <EditTripModal
                        editTrip={this.editTrip}
                        {...this.props}
                        handleFieldChange={this.handleFieldChange}
                        targId={this.state.targId}
                        targInfo={this.state.targInfo.response}
                      />
                    )
                  },
                  () => {
                    document.querySelector(".modal").classList.add("is-active");
                  }
                );
              }
            );
          });
        }
      );
    }
  };

  goToTrip = event => {
    if (event.target.id === "edtBtn") {
      // this.editTrip;
    } else if (event.target.id === "deleteBtn") {
      fetch("http://localhost:5002/trips?_expand=user")
        .then(e => e.json())
        .then(trip =>
          this.setState({
            trips: trip.filter(user => user.userId === this.state.user)
          })
        );
    } else {
      var id1 = event.target.closest("div").id;
      // console.log(id1);
      APIHandler.getData("trips", id1)
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
        .then(this.props.history.push(`/TripDash/${id1}`));
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
                <Button
                  isColor="info"
                  className="dashboard-welcome-button pleaseCenter"
                  onClick={this.TripModal}
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
              editTrip={this.editTripModal}
              props={this.props}
              goToTrip={this.goToTrip}
              user={this.state.user}
              state={this.state}
              editTripModal={this.state.editTrip}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
