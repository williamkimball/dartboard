//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";
import APIHandler from "./APIHandler";
import { Button, Column } from "bloomer";
import "bulma/css/bulma.css";
import BudgetModal from "./BudgetModal";
import ItineraryModal from "./ItineraryModal";
import FlightModal from "./FlightModal";
import Flight from "./Flight";

export default class TripDash extends Component {
  getTripInfo = tripId => {
    return APIHandler.getTripData(tripId).then(result => {
      this.setState({ tripInfo: result });
    });
    // .then(APIHandler.getData("flight"))
    // .then(result => {
    //   this.setState({ flight: result });
    // })
    // .then(APIHandler.getData("itinerary"))
    // .then(result => {
    //   this.setState({ itinerary: result });
    // })
    // .then(APIHandler.getData("budget"))
    // .then(result => {
    //   this.setState({ budget: result });
    // });
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  componentDidMount() {
    this.getTripInfo(this.props.match.params.anumber);
  }

  BudgetModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState(
        { FlightModal: "", ItineraryModal: "", BudgetModal: "" },
        () => {
          this.setState({ BudgetModal: <BudgetModal /> }, () => {
            document.querySelector(".modal").classList.add("is-active");
          });
        }
      );
    } else {
      this.setState({ BudgetModal: <BudgetModal /> }, () => {
        document.querySelector(".modal").classList.add("is-active");
      });
    }
  };

  ItineraryModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState(
        { FlightModal: "", ItineraryModal: "", BudgetModal: "" },
        () => {
          this.setState({ ItineraryModal: <ItineraryModal /> }, () => {
            document.querySelector(".modal").classList.add("is-active");
          });
        }
      );
    } else {
      this.setState({ ItineraryModal: <ItineraryModal /> }, () => {
        document.querySelector(".modal").classList.add("is-active");
      });
    }
  };

  FlightModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState(
        { FlightModal: "", ItineraryModal: "", BudgetModal: "" },
        () => {
          this.setState(
            {
              FlightModal: (
                <FlightModal
                  {...this.props}
                  addNewFlight={this.addNewFlight}
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
          FlightModal: (
            <FlightModal
              {...this.props}
              addNewFlight={this.addNewFlight}
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

  addNewFlight = event => {
    event.preventDefault();

    // Add new flight to the API
    fetch(`http://localhost:5002/flight?_expand=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        FlightName: this.state.FlightName,
        FlightStartDate: this.state.FlightStartDate,
        FlightEndDate: this.state.FlightEndDate,
        FlightNumber: this.state.FlightNumber,
        FlightOrigin: this.state.FlightOrigin,
        FlightDestination: this.state.FlightDestination,
        userId: this.state.tripInfo.userId
      })
    })
      // When POST is finished, retrieve the new list of trips
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          FlightModal: ""
        });
        alert("Added New Article Sucessfully");
        return fetch("http://localhost:5002/flight?_expand=user");
      })
      .then(
        APIHandler.getUserName(this.state.tripInfo.userId).then(username => {
          this.setState({ userName: username }, () => {
            fetch("http://localhost:5002/flight?_expand=user")
              .then(e => e.json())
              .then(flight =>
                this.setState({
                  flight: flight.filter(
                    user => user.userId === this.state.tripInfo.userId
                  )
                })
              );
          });
        })
      );
  };

  state = {
    tripInfo: "",
    flight: [],
    itinerary: "",
    budget: "",
    BudgetModal: "",
    ItineraryModal: "",
    FlightModal: ""
  };

  currentInfo = "";

  pillListener = event => {
    if (event.target.classList.contains("active") === false) {
      let tabs = document.getElementsByClassName("active");

      for (let item of tabs) {
        item.classList.remove("active");
        item.setAttribute("aria-selected", false);
      }
      event.target.classList.add("active");
      event.target.setAttribute("aria-selected", true);
    } else {
    }
    switch (event.target.parentNode.textContent) {
      case "Itinerary":
        let tabcont = document.getElementsByClassName("show");
        for (let item of tabcont) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("itinerary").classList.add("show");
        document.getElementById("itinerary").classList.add("active");

        this.currentInfo =
          "Everyone is going to see things differently - and that's the way it should be. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. There comes a nice little fluffer.";

        break;
      case "Flights":
        let tabcont1 = document.getElementsByClassName("show");
        for (let item of tabcont1) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("flights").classList.add("show");
        document.getElementById("flights").classList.add("active");

        fetch("http://localhost:5002/flight?_expand=user")
          .then(e => e.json())
          .then(flight =>
            this.setState({
              flight: flight.filter(
                user => user.userId === this.state.tripInfo.userId
              )
            })
          );

        this.currentInfo =
          " Hodor hodor! Hodor, hodor, hodor hodor. HODOR hodor, hodor. Hodor hodor! Hodor? Hodor hodor! HODOR? Hodor hodor. HODOR hodor, hodor. HODOR? Hodor, hodor. Hodor. HODOR HODOR!";

        break;
      case "Budget":
        let tabcont2 = document.getElementsByClassName("show");
        for (let item of tabcont2) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("budget").classList.add("show");
        document.getElementById("budget").classList.add("active");

        this.currentInfo =
          "Mustache four dollar toast tattooed deep v church-key selvage asymmetrical pabst coloring book post-ironic ethical fam. Cornhole snackwave listicle meh, try-hard irony four dollar toast biodiesel seitan kitsch chambray jean shorts. Authentic health goth thundercats master cleanse, literally hoodie selvage slow-carb. Kinfolk pok pok kogi jianbing brooklyn. Woke freegan migas organic tote bag. Fixie ethical microdosing pop-up shaman cronut vegan brooklyn vape hoodie.";

        break;
      default:
    }
  };

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column">
                  <h1 className="title">{this.state.tripInfo.title}</h1>
                  <h2 className="subtitle">
                    {this.state.tripInfo.startDate} -{" "}
                    {this.state.tripInfo.endDate}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" onClick={this.pillListener}>
            <a
              className="nav-link"
              id="flights-tab"
              data-toggle="tab"
              href="#flight"
              role="tab"
              aria-controls="flights"
              aria-selected="false"
            >
              Flights
            </a>
          </li>
          <li className="nav-item" onClick={this.pillListener}>
            <a
              className="nav-link active"
              id="itinerary-tab"
              data-toggle="tab"
              href="#itinerary"
              role="tab"
              aria-controls="itinerary"
              aria-selected="true"
            >
              Itinerary
            </a>
          </li>
          <li className="nav-item" onClick={this.pillListener}>
            <a
              className="nav-link"
              id="budget-tab"
              data-toggle="tab"
              href="#budget"
              role="tab"
              aria-controls="budget"
              aria-selected="false"
            >
              Budget
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade"
            id="flights"
            role="tabpanel"
            aria-labelledby="flights-tab"
          >
            <Button
              isColor="info"
              render={props => (
                <Column hasTextAlign="centered">
                  <p {...props} onClick={this.FlightModal}>
                    New Flight
                  </p>
                </Column>
              )}
            />
            <div className="dashboard-tripCards">
            {this.state.FlightModal}
            {this.state.flight.map(flight => (
              <Flight
                key={flight.id}
                flight={flight}
                user={this.state.user}
                state={this.state}
              />
            ))}
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="itinerary"
            role="tabpanel"
            aria-labelledby="itinerary-tab"
          >
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
            {this.currentInfo}
          </div>
          <div
            className="tab-pane fade"
            id="budget"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <Button
              isColor="info"
              render={props => (
                <Column hasTextAlign="centered">
                  <p {...props} onClick={this.BudgetModal}>
                    New Budget Item
                  </p>
                </Column>
              )}
            />
            {this.state.BudgetModal}
            {this.currentInfo}
          </div>
        </div>
      </div>
    );
  }
}
