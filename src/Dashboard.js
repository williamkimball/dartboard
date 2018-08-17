import React, { Component } from "react";
import APIHandler from "./APIHandler";
import TripForm from "./TripForm";
import Trip from "./Trip";
// import Unsplash from "unsplash-js";
import FindFlightModal from "./APITripForm";
import FindFlightResults from "./FindFlightResults";
import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Column,
  Hero,
  HeroBody,
  Container,
  Columns,
  Title,
  Subtitle
} from "bloomer";

import TripDash from "./TripDash";
import EditTripModal from "./editTripModal";
import apiKeys from "./APIKeys";

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
    AirportResults: [],
    departureKeyNo: 0
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
    let endDate = this.state.FindFlightEndDate;
    let origin = this.state.FindFlightOrigin.toUpperCase();
    let destination = this.state.FindFlightDestination;

    fetch(
      `http://localhost:6060/api/prices/cheap?origin=${origin}&destination=-&depart_date=${startDate}&token=${apiKeys.TravelPayoutKey()}&currency=usd`,
      {
        method: "GET"
      }
    )
      .then(e => e.json())
      .then(results => {
        console.log(results.data);
        if (Object.keys(results.data).length === 0) {
          alert(
            "No flights found for that Origin/Date please try another day or origin"
          );
        }
        this.setState({
          FindFlightResults: results.data,
          FindFlightModal: ""
        });
        return results;
      })
      .then(results => {
        console.log(results);
        let AirportList = this.state.AirportResults;
        for (let result in results.data) {
          // console.log(result)
          fetch(`https://www.air-port-codes.com/api/v1/single?iata=${result}`, {
            headers: {
              // Accept: "application/json",
              "Apc-Auth": apiKeys.airportSearch()
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
      });
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
                  dashHead: `Welcome to DartBoard, ${this.state.userName}!`
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
      if (
        this.state.FindFlightResults[key][this.state.departureKeyNo] ===
        undefined
      ) {
        this.setState({ departureKeyNo: (this.state.departureKeyNo += 1) });
      } else {
        let title = "";
        this.state.AirportResults.map(Airport => {
          console.log(Airport);
          //   console.log(key);
          if (Airport.term === key && Airport.status !== false) {
            // console.log("itsa match");
            title = Airport.airport.full_location;
          }
        });
        let Dest = this.state.FindFlightResults[key][this.state.departureKeyNo];
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
              return trip;
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
                        dashHead: `Welcome to Dartboard, ${
                          this.state.userName
                        }!`
                      })
                    );
                });
              })
            );
        }
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

  goHome = () => {
    this.props.history.push("/");
  };

  logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.goHome();
  };

  render() {
    return (
      <React.Fragment>
        <Hero isSize="small">
          <HeroBody>
            <Container>
              <Columns is-vcentered>
                <Column>
                  {/* <Image isSize="48x48" src={require('././DartBoardRed.png')} id="logo"/> */}
                  <Title id="main-head" hasTextColor="white">
                    {this.state.dashHead}
                  </Title>
                  <Subtitle hasTextColor="white">
                    {this.state.dashHeadDates}
                  </Subtitle>
                </Column>
                <Column isOffset="1/3" id="dashButtons">
                  <Column id="homeLogOut">
                    <Button isColor="info" id="homeBtn" onClick={this.goHome}>
                      Home
                    </Button>
                    <Button isColor="info" onClick={this.logOut}>
                      Logout
                    </Button>
                  </Column>
                  <Column>
                    <Button
                      isColor="info"
                      className="dashboard-welcome-button pleaseCenter"
                      id="newTripBtn"
                      onClick={this.TripModal}
                    >
                      Add New Trip
                    </Button>
                    <Button
                      isColor="info"
                      id="dartBtn"
                      {...this.props}
                      onClick={this.FindFlightModal}
                    >
                      Throw a Dart
                    </Button>
                  </Column>
                  <Column />
                </Column>
              </Columns>
            </Container>
          </HeroBody>
        </Hero>

        <Columns
          className="dashboard-tripCards"
          isCentered="true"
          isMultiline="true"
          isGrid="true"
        >
          {this.state.tripForm}
          {this.state.FindFlightModal}
          {this.state.FindFlightResultsModal}
          {/* <Column isSize="1/4"> */}
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
              goHome={this.goHome}
              logOut={this.logOut}
              Image={this.state.image}
              isColor="light"
              {...this.props}
            />
          ))}
          {/* </Column> */}
        </Columns>
      </React.Fragment>
    );
  }
}
