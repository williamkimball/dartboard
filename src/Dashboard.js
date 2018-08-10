import React, { Component } from "react";
import APIHandler from "./APIHandler";
import TripForm from "./TripForm";
import Trip from "./Trip";
// import Unsplash from "unsplash-js";
import FindFlightModal from "./APITripForm";
import FindFlightResults from "./FindFlightResults";
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
    targInfo: "",
    FindFlightModal: "",
    FindFlightResults: {},
    AirportResults: []
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  //This function creates the Flight Modal that pops up when the "add new flight" button is pressed.
  FindFlightModal = () => {
    //checks to see if the modal is in state
    if (document.querySelector(".modal") !== null) {
      this.setState(
        {
          FlightModal: "",
          ItineraryModal: "",
          BudgetModal: "",
          FindFlightModal: ""
        },
        () => {
          this.setState(
            {
              FindFlightModal: (
                <FindFlightModal
                  {...this.props}
                  FindFlight={this.FindFlight}
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
          FindFlightModal: (
            <FindFlightModal
              {...this.props}
              FindFlight={this.FindFlight}
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

  FindFlight = () => {
    let startDate = this.state.FindFlightStartDate;
    // console.log(startDate)
    // startDate = startDate.slice(0, -3);
    // console.log(startDate)
    let endDate = this.state.FindFlightEndDate;
    // console.log(endDate)
    // endDate = endDate.slice(0, -3);
    // console.log(endDate)
    let origin = this.state.FindFlightOrigin;
    let destination = this.state.FindFlightDestination;

    fetch(
      `http://localhost:6060/api/prices/cheap?origin=${origin}&destination=-&depart_date=${startDate}&token=7fe8a6850404e8611035f004e2a6bc3f&currency=usd`,
      {
        method: "GET"
      }
    )
      .then(e => e.json())
      .then(results => {
        console.log(results.data);
        this.setState({
          FindFlightResults: results.data,
          FindFlightModal: ""
        });
        return results;
      })
      .then(results => {
        // console.log(results.data)
        let AirportList = this.state.AirportResults;
        for (let result in results.data) {
          // console.log(result)
          fetch(`https://www.air-port-codes.com/api/v1/single?iata=${result}`, {
            headers: {
              // Accept: "application/json",
              "Apc-Auth": "3d57d73c4b"
            },
            method: "POST"
          })
            .then(e => e.json())
            .then(results => {
              this.setState({
                AirportResults: this.state.AirportResults.concat(results)
              });
            })
            .then(() => {
              this.setState(
                {
                  FindFlightResultsModal: (
                    <FindFlightResults
                      {...this.props}
                      AirportResults={this.state.AirportResults}
                      FindFlightResults={this.state.FindFlightResults}
                      addFoundFlight={this.addSearchedTrip}
                    />
                  )
                },
                () => {
                  document.querySelector(".modal").classList.add("is-active");
                }
              );
            });
        }
      })
    }

  // .then(

  getImage = async destination => {
    // const response = await  fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=1&query=${destination}&client_id=38b469e4ae6b45d6f859a5ce65ad4a6a0b06fc792cab0d16cc7bf052a396384c`, {
    //   headers: {
    //     "Cache-Control": "no-cache",
    //     "Postman-Token": "d73fa50b-25c2-455b-861f-89c874d1aa02"
    //   }
    // })
    // const json = await response.json();
    // return await json

    const json = await fetch(
      `https://api.unsplash.com/search/photos/?page=1&per_page=1&query=${destination}&client_id=38b469e4ae6b45d6f859a5ce65ad4a6a0b06fc792cab0d16cc7bf052a396384c`
    ).then(response => response.json()).then(response => {return response});
    return json
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
    // console.log(tripLength);

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
        for (let i = 0; i < tripLength; i++) {
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

  addSearchedTrip = event => {
    event.preventDefault();

    let destination = event.target.id;
    for (let key in this.state.FindFlightResults) {
      let title = "";
      this.state.AirportResults.map(Airport => {
        //   console.log(Airport.term);
        //   console.log(key);
        if (Airport.term === key) {
          // console.log("itsa match");
          title = Airport.airport.full_location;
        }
      });
      let Dest = this.state.FindFlightResults[key][0];
      if (key === destination) {
        let tripEnd = Date.parse(Dest.return_at.slice(0, -10));
        let tripStart = Date.parse(Dest.departure_at.slice(0, -10));
        let tripLength = (tripEnd - tripStart) / 86400000;
        console.log(tripLength);
        // Add new trips to the API
        fetch(`http://localhost:5002/trips?_expand=user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            title: title,
            startDate: Dest.departure_at.slice(0, -10),
            endDate: Dest.return_at.slice(0, -10),
            tripLength: tripLength,
            userId: this.state.user
          })
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(trip) {
            console.log(tripLength);
            for (let i = 0; i < tripLength; i++) {
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
            return trip;
          })
          .then(trip => {
            console.log("budget");
            // Add new budget to the API
            fetch(`http://localhost:5002/budget`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                budgetItemTitle: `Flight to ${trip.title}`,
                budgetItemPrice: Dest.price,
                tripId: trip.id
              })
            });
            return trip;
          })
          .then(trip => {
            fetch(`http://localhost:5002/flight?_expand=user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                FlightName: `Flight to ${trip.title}`,
                FlightStartDate: Dest.departure_at.slice(0, -10),
                FlightEndDate: Dest.return_at.slice(0, -10),
                FlightNumber: `${Dest.airline} ${Dest.flight_number}`,
                FlightOrigin: this.state.FindFlightOrigin,
                FlightDestination: destination,
                tripId: trip.id
              })
            });
          })
          // When POST is finished, retrieve the new list of trips
          .then(() => {
            // Remember you HAVE TO return this fetch to the subsequent `then()`
            this.setState({
              FindFlightResultsModal: ""
            });
            alert("Added New Trip Sucessfully");
            return fetch("http://localhost:5002/trips?_expand=user");
          })
          .then(
            APIHandler.getUserName(this.state.user).then(username => {
              this.setState({ userName: username }, () => {
                fetch("http://localhost:5002/trips?_expand=user")
                  .then(e => e.json())
                  .then(trip =>
                    this.setState({
                      trips: trip.filter(
                        user => user.userId === this.state.user
                      ),
                      dashHead: `Welcome to Dartboard, ${this.state.userName}!`
                    })
                  );
              });
            })
          );
      }
    }
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

  deleteTrip = event => {
    var id3 = event.target.closest("div").id;
    // console.log(id3)
    return fetch(`http://localhost:5002/trips/${id3}`, {
      method: "DELETE"
    })
      .then(() => {
        return fetch("http://localhost:5002/trips?_expand=user");
      })
      .then(e => e.json())
      .then(trip =>
        this.setState({
          trips: trip.filter(user => user.userId === this.state.user)
        })
      );
  };

  editTrip = event => {
    let targId = this.state.targId;
    // console.log(targId);
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
        document.querySelector(".modal").classList.remove("is-active");
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
    console.log(event.target);
    if (event.target.id === "edtBtn") {
    } else if (event.target.id === "deleteBtn") {
    } else {
      var id1 = event.target.id;
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
                <Button
                  isColor="info"
                  {...this.props}
                  onClick={this.FindFlightModal}
                >
                  Throw a Dart
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-tripCards">
          {this.state.tripForm}
          {this.state.FindFlightModal}
          {this.state.FindFlightResultsModal}
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
              deleteTrip={this.deleteTrip}
              getImage={this.getImage}
              isColor="light"
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
