//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";
import APIHandler from "./APIHandler";
import { Button, Column } from "bloomer";
import "bulma/css/bulma.css";
import BudgetModal from "./DisplayModals/BudgetModal";
import FlightModal from "./DisplayModals/FlightModal";
import Flight from "./Flight";
import Itinerary from "./Itinerary";
import Budget from "./Budget";
import EditFlightModal from "./EditFlightModal";
import EditItineraryModal from "./EditItineraryItemModal";
import ListModal from "./DisplayModals/ListModal";
import ListTab from "./ListTab";
import ListTabContent from "./ListTabContent";
import ListItemModal from "./DisplayModals/ListItemModal"

export default class TripDash extends Component {
  //this is the state for this component. Turns out state is pretty important in react.
  state = {
    tripInfo: "",
    flight: [],
    itinerary: [],
    budget: [],
    list: [],
    listModal: "",
    BudgetModal: "",
    FlightModal: "",
    budgetTotal: 0,
    editFlightModal: "",
    listTabs: [],
    name: [],
    ListItemModal: ""
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
            this.setState(
              {
                itinerary: itinerary.filter(
                  itinerary => itinerary.tripId === this.state.tripInfo.id
                )
              },
              () => {
                this.checkForLists();
              }
            )
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
    this.getTripInfo(this.props.match.params.anumber).then(this.checkForLists);
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

  editFlight = event => {
    let targId = this.state.targId;
    console.log(targId);
    fetch(`http://localhost:5002/flight/${targId}`, {
      method: "PATCH",
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
        endDate: this.state.endDate
      })
    }) // When POST is finished, retrieve the new list of flights
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          FlightModal: "",
          editFlightModal: ""
        });
        alert("Edited Flight Sucessfully");
        return fetch("http://localhost:5002/flight");
      })
      .then(
        APIHandler.getUserName(this.state.user).then(username => {
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
      )
      .then(() => {
        document.querySelector(".modal").classList.remove("is-active");
      });
  };

  getFlightInfoForEdit = () => {
    return APIHandler.getFlightData(this.state.targId);
  };

  editFlightModal = event => {
    let targId = event.target.parentNode.id;

    if (document.querySelector(".modal") !== null) {
      this.setState(
        {
          editFlightModal: "",
          FlightModal: "",
          targId: targId
        },
        () => {
          this.getFlightInfoForEdit(this.state.targId).then(response => {
            console.log(response);
            this.setState(
              {
                targInfo: { response }
              },
              () => {
                this.setState(
                  {
                    editFlight: (
                      <EditFlightModal
                        editFlight={this.editFlight}
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
          FlightModal: "",
          targId: targId
        },
        () => {
          this.getFlightInfoForEdit(this.state.targId).then(response => {
            console.log(response);
            this.setState(
              {
                targInfo: { response }
              },
              () => {
                this.setState(
                  {
                    editFlight: (
                      <EditFlightModal
                        editFlight={this.editFlight}
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

  getItineraryInfoForEdit = () => {
    return APIHandler.getItineraryItemData(this.state.targId);
  };

  editItineraryModal = event => {
    let targId = event.target.parentNode.id;

    if (document.querySelector(".modal") !== null) {
      this.setState(
        {
          editItineraryModal: "",
          // editItinerary: "",
          targId: targId,
          ItineraryModal: ""
        },
        () => {
          this.getItineraryInfoForEdit(this.state.targId).then(response => {
            console.log(this.editItinerary);
            this.setState(
              {
                targInfo: { response }
              },
              () => {
                this.setState(
                  {
                    editItineraryModal: (
                      <EditItineraryModal
                        editItinerary={this.editItinerary}
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
          editItineraryModal: "",
          targId: targId,
          ItineraryModal: ""
        },
        () => {
          this.getItineraryInfoForEdit(this.state.targId).then(response => {
            console.log(this.editItinerary);
            this.setState(
              {
                targInfo: { response }
              },
              () => {
                this.setState(
                  {
                    editItineraryModal: (
                      <EditItineraryModal
                        editItinerary={this.editItinerary}
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

  editItinerary = event => {
    let targId = this.state.targId;
    console.log(targId);
    fetch(`http://localhost:5002/itineraryItem/${targId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        ItineraryName: this.state.ItineraryName,
        // itineraryId: this.props.itinerary.id,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      })
    }) // When POST is finished, retrieve the new list of flights
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        this.setState({
          ItineraryModal: "",
          editItineraryModal: "",
          ItineraryName: "",
          // itineraryId: this.props.itinerary.id,
          startTime: "",
          endTime: ""
        });
        alert("Edited Itinerary Item Sucessfully");
        return fetch("http://localhost:5002/itineraryItem")
          .then(e => e.json())
          .then(itinerary =>
            this.setState({
              itinerary: itinerary.filter(
                itinerary =>
                  itinerary.tripId === this.state.tripInfo.id &&
                  itinerary.itineraryId === this.state.targInfo.itineraryId
              )
            })
          );
      })
      .then(
        //this the username, and then sets the state of itinerary to be equal to a list of itineraries that is filtered by the trip number
        () => {
          this.getTripInfo(this.state.tripInfo.id);
        }
      );
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
    let targetId = event.target.parentNode.id;
    // this.setState({
    //   budgetTotal: parseInt(total) - parseInt(event.target)
    // });
    return fetch(`http://localhost:5002/budget/${event.target.parentNode.id}`, {
      method: "GET"
    })
      .then(e => e.json())
      .then(response => {
        targetPrice = response.budgetItemPrice;
      })
      .then(() => {
        this.setState({
          budgetTotal: parseInt(total) - targetPrice
        });
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
                  // console.log(total);
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
        let tabcont3 = document.getElementsByClassName("show");
        // console.log(event.target.parentNode.textContent);
        for (let item of tabcont3) {
          // console.log(item)
          item.classList.remove("show");
          item.classList.remove("active");
        }

        let name = event.target.parentNode.textContent;

        fetch(`http://localhost:5002/list`)
          .then(e => e.json())
          .then(custList =>
            this.setState({
              name: custList.filter(
                custList => custList.tripId === this.state.tripInfo.id && custList.listName === name
              )
            }, () => {
              document
                .getElementById(`${name}`)
                .classList.add("show");
              document
                .getElementById(`${name}`)
                .classList.add("active");})
          )
    }
  };

  addList = () => {
    // Add new list to the API
    fetch(`http://localhost:5002/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        listName: this.state.ListName,
        tripId: this.state.tripInfo.id
      })
    })
      .then(() => {
        this.checkForLists();
      })
      .then(() => {
        this.turnInactive();
      });
  };

  turnInactive = () => {
    document.querySelector(".modal").classList.remove("is-active");
  };

  addNewList = () => {
    this.setState(
      {
        listModal: (
          <ListModal
            {...this.props}
            handleFieldChange={this.handleFieldChange}
            targId={this.state.targId}
            addList={this.addList}
          />
        )
      },
      () => {
        document.querySelector(".modal").classList.add("is-active");
      }
    );
  };

  checkForLists = () => {
    fetch("http://localhost:5002/list")
      .then(e => e.json())
      .then(list =>
        this.setState(function(prevState) {
          return {
            list: list.filter(list => list.tripId === prevState.tripInfo.id)
          };
        })
      );
  };

  NewListItem = () => {
    this.setState(
      {
        ListItemModal: (
          <ListItemModal
          addListItem={this.addListItem}
            {...this.props}
            handleFieldChange={this.handleFieldChange}
            targId={this.state.targId}
            addList={this.addList}
          />
        )
      },
      () => {
        document.querySelector(".modal").classList.add("is-active");
      }
    );
  }

  addListItem = () => {
    // Add new list to the API
    fetch(`http://localhost:5002/listItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        listItemContent: this.state.ListItemContent,
        listId: this.state.name[0].id,

      })
    })
      .then(() => {
        this.turnInactive();
      });
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
                    {this.state.tripInfo.startDate} to{" "}
                    {this.state.tripInfo.endDate}
                  </h2>
                  <Button isColor="info" onClick={this.addNewList}>
                    New List
                  </Button>
                  {this.state.listModal}
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
          {this.state.list.map(tab => (
            <ListTab
              key={tab.id}
              user={this.state.user}
              state={this.state}
              tripInfo={this.state.tripInfo}
              pillListener={this.pillListener}
              tab={tab}
            />
          ))}
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
                  editFlight={this.editFlightModal}
                  editFlightModal={this.state.editFlight}
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
                  editItinerary={this.editItinerary}
                  editItineraryModal={this.editItineraryModal}
                  editItineraryModalState={this.state.editItineraryModal}
                  // editItineraryModalState={this.state.ItineraryModal}
                  ItineraryModal={this.ItineraryModal}
                  {...this.props}
                  tripInfo={this.state.tripInfo}
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
          {this.state.name.map(tab => (
            <ListTabContent
              key={tab.id}
              user={this.state.user}
              ListItemModal={this.state.ListItemModal}
              NewListItem={this.NewListItem}
              state={this.state}
              tripInfo={this.state.tripInfo}
              pillListener={this.pillListener}
              tab={tab}
              
            />
          ))}
        </div>
      </div>
    );
  }
}
