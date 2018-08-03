//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";
import APIHandler from "./APIHandler";
import { Button, Column } from "bloomer";
import "bulma/css/bulma.css";
import BudgetModal from "./DisplayModals/BudgetModal";
// import ItineraryModal from "./DisplayModals/ItineraryModal";
import FlightModal from "./DisplayModals/FlightModal";
import Flight from "./Flight";
import Itinerary from "./Itinerary";
import Budget from "./Budget";

export default class TripDash extends Component {
  //this is the state for this component. Turns out state is pretty important in react.
  state = {
    tripInfo: "",
    flight: [],
    itinerary: [],
    budget: [],
    BudgetModal: "",
    // ItineraryModal: "",
    FlightModal: "",
    budgetTotal: 0
  };

  //this function gets the information related to the trip
  getTripInfo = tripId => {
    return APIHandler.getTripData(tripId)
      .then(result => {
        this.setState({ tripInfo: result });
      })
      .then(() => {
        fetch("http://localhost:5002/itinerary")
          .then(e => e.json())
          .then(itinerary =>
            this.setState({
              itinerary: itinerary.filter(
                itinerary => itinerary.tripId === this.state.tripInfo.id
              )
            })
          );
      });
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  //this function is what calls the getTripInfo function
  componentDidMount() {
    this.getTripInfo(this.props.match.params.anumber);
  }

  BudgetModal = () => {
    if (document.querySelector(".modal") !== null) {
      this.setState(
        { FlightModal: "", ItineraryModal: "", BudgetModal: "" },
        () => {
          this.setState(
            {
              BudgetModal: (
                <BudgetModal
                  addNewBudgetItem={this.addNewBudgetItem}
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
          BudgetModal: (
            <BudgetModal
              addNewBudgetItem={this.addNewBudgetItem}
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

  //This function creates the Flight Modal that pops up when the "add new flight" button is pressed.
  FlightModal = () => {
    //checks to see if the modal is in state
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

  //this function handles all of the functionality related to adding a new flight to the database and then redrawing the page to create a card for it.
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
        tripId: this.state.tripInfo.id
      })
    })
      // When POST is finished, retrieve the new list of trips
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          FlightModal: ""
        });
        alert("Added New Article Sucessfully");
        return fetch("http://localhost:5002/flight");
      })
      .then(
        //this the username, and then sets the state of flight to be equal to a list of flights that is filtered by the trip number
        APIHandler.getUserName(this.state.tripInfo.userId).then(username => {
          this.setState({ userName: username }, () => {
            fetch("http://localhost:5002/flight")
              .then(e => e.json())
              .then(flight =>
                this.setState({
                  flight: flight.filter(
                    flight => flight.tripId === this.state.tripInfo.id
                  )
                })
              );
          });
        })
      );
  };

  deleteFlightItem = event => {
    console.log(event.target.parentNode.id);
    fetch(`http://localhost:5002/flight/${event.target.parentNode.id}`, {
      method: "DELETE"
    }).then(() => {
      fetch("http://localhost:5002/flight")
        .then(e => e.json())
        .then(flight =>
          this.setState({
            flight: flight.filter(
              flight => flight.tripId === this.state.tripInfo.id
            )
          })
        );
    });
  };

  //this function handles all of the functionality related to adding a new budgetItem to the database and then redrawing the page to create a card for it.
  addNewBudgetItem = event => {
    event.preventDefault();

    // Add new budget to the API
    fetch(`http://localhost:5002/budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        budgetItemTitle: this.state.budgetItemTitle,
        budgetItemPrice: this.state.budgetItemPrice,
        tripId: this.state.tripInfo.id
      })
    })
      // When POST is finished, retrieve the new list of trips
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          BudgetModal: ""
        });
        alert("Added New Budget Item Sucessfully");
        return fetch("http://localhost:5002/budget");
      })
      .then(
        //this the username, and then sets the state of budget to be equal to a list of budgets that is filtered by the trip number
        APIHandler.getUserName(this.state.tripInfo.userId).then(username => {
          this.setState({ userName: username }, () => {
            fetch("http://localhost:5002/budget")
              .then(e => e.json())
              .then(budget =>
                this.setState(
                  {
                    budget: budget.filter(
                      budget => budget.tripId === this.state.tripInfo.id
                    )
                  },
                  () => {
                    this.state.budget.map(budget => {
                      this.setState({
                        budgetTotal:
                          parseInt(this.state.budgetTotal) +
                          parseInt(budget.budgetItemPrice)
                      });
                    });
                  }
                )
              );
          });
        })
      );
  };

  deleteBudgetItem = event => {
    let total = this.state.budgetTotal;
    let targetPrice = 0;
    let targetId = event.target.parentNode.id
    // this.setState({
    //   budgetTotal: parseInt(total) - parseInt(event.target)
    // });
    return fetch(`http://localhost:5002/budget/${event.target.parentNode.id}`, {
      method: "GET"
    })
      .then(e => e.json())
      .then(response => {
        targetPrice = response.budgetItemPrice;
      }).then(()=> {
        this.setState({
          budgetTotal: parseInt(total) - targetPrice
        })
      })
      .then(() => {
        fetch(`http://localhost:5002/budget/${targetId}`, {
          method: "DELETE"
        }).then(() => {
          fetch("http://localhost:5002/budget")
            .then(e => e.json())
            .then(budget =>
              this.setState({
                budget: budget.filter(
                  budget => budget.tripId === this.state.tripInfo.id
                )
              })
            );
        });
      });
  };

  currentInfo = "";

  //this is the function that handles the tabbed displays, and contextually renders the contents based on which tab is selected.
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
        fetch("http://localhost:5002/itinerary")
          .then(e => e.json())
          .then(itinerary =>
            this.setState({
              itinerary: itinerary.filter(
                itinerary => itinerary.tripId === this.state.tripInfo.id
              )
            })
          );
        this.currentInfo = "";

        break;
      case "Flights":
        let tabcont1 = document.getElementsByClassName("show");
        for (let item of tabcont1) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("flights").classList.add("show");
        document.getElementById("flights").classList.add("active");

        fetch("http://localhost:5002/flight")
          .then(e => e.json())
          .then(flight =>
            this.setState({
              flight: flight.filter(
                flight => flight.tripId === this.state.tripInfo.id
              )
            })
          );

        break;
      case "Budget":
        let tabcont2 = document.getElementsByClassName("show");
        for (let item of tabcont2) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("budget").classList.add("show");
        document.getElementById("budget").classList.add("active");

        let total = 0;
        fetch("http://localhost:5002/budget")
          .then(e => e.json())
          .then(budget =>
            this.setState(
              {
                budget: budget.filter(
                  budget => budget.tripId === this.state.tripInfo.id
                )
              },
              () => {
                this.state.budget.map(budget => {
                  total += parseInt(budget.budgetItemPrice);
                  console.log(total);
                });
              }
            )
          )
          .then(() => {
            this.setState({
              budgetTotal: total
            });
          });

        break;
      default:
    }
  };

  render() {
    //this is the main body of the TripDash component. there is a main skeleton, and then the content of each tab is dynamically generated through the use of the PillListener function.
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
                  tripInfo={this.state.tripInfo}
                  deleteFlightItem={this.deleteFlightItem}
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
            <div className="dashboard-tripCards">
              {this.state.itinerary.map(itinerary => (
                <Itinerary
                  key={itinerary.id}
                  itinerary={itinerary}
                  user={this.state.user}
                  state={this.state}
                  itineraryModalState={this.state.ItineraryModal}
                  ItineraryModal={this.ItineraryModal}
                  {...this.props}
                  getTripInfo={this.getTripInfo}
                />
              ))}
            </div>
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
            <div className="card">
              {this.state.BudgetModal}
              <h2>Budget</h2>
              {this.state.budget.map(budget => (
                <Budget
                  key={budget.id}
                  budget={budget}
                  user={this.state.user}
                  state={this.state}
                  tripInfo={this.state.tripInfo}
                  deleteBudgetItem={this.deleteBudgetItem}
                />
              ))}
              <h5>Total: {this.state.budgetTotal}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
