//William Kimball 2018
//This file builds each itinerary card

import "./Trip.css";
import React, { Component } from "react";
import { Button, Column } from "bloomer";
import ItineraryModal from "./DisplayModals/ItineraryModal";
import APIHandler from "./APIHandler";
// import EditItineraryModal from "./EditItineraryItemModal"

//This function creates the Itinerary Modal that pops up when the "add new Itinerary item" button is pressed.

export default class Itinerary extends Component {
  state = {
    ItineraryModal: "",
    itinerary: [],
    itineraryItem: [],
    editItineraryModal: ""
  };

  deleteItineraryItem = event => {
    console.log(event.target.parentNode.id);
    fetch(`http://localhost:5002/itineraryItem/${event.target.parentNode.id}`, {
      method: "DELETE"
    }).then(() => {
      fetch("http://localhost:5002/itineraryItem")
        .then(e => e.json())
        .then(itinerary =>
          this.setState({
            itineraryItem: itinerary.filter(
              itinerary =>
                itinerary.tripId === this.props.state.tripInfo.id &&
                itinerary.itineraryId === this.props.itinerary.id
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
  componentDidMount() {
    fetch("http://localhost:5002/itineraryItem")
      .then(e => e.json())
      .then(itinerary =>
        this.setState({
          itineraryItem: itinerary.filter(
            itinerary =>
              itinerary.tripId === this.props.state.tripInfo.id &&
              itinerary.itineraryId === this.props.itinerary.id
          )
        })
      );
  }
  //this function handles all of the functionality related to adding a new itinerary to the database and then redrawing the page to create a card for it.
  addNewItinerary = event => {
    event.preventDefault();

    // Add new itinerary item to the API
    fetch(`http://localhost:5002/itineraryItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        ItineraryName: this.state.ItineraryName,
        itineraryId: this.props.itinerary.id,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
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
        return fetch("http://localhost:5002/itineraryItem")
          .then(e => e.json())
          .then(itinerary =>
            this.setState({
              itineraryItem: itinerary.filter(
                itinerary =>
                  itinerary.tripId === this.props.state.tripInfo.id &&
                  itinerary.itineraryId === this.props.itinerary.id
              )
            })
          );
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

  // editItinerary = () => {
  //   let targId = this.state.targId;
  //   console.log(targId);
  //   fetch(`http://localhost:5002/itineraryItem/${targId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8"
  //     },
  //     body: JSON.stringify({
  //       ItineraryName: this.state.ItineraryName,
  //       // itineraryId: this.props.itinerary.id,
  //       startTime: this.state.startTime,
  //       endTime: this.state.endTime
  //     })
  //   }) // When POST is finished, retrieve the new list of flights
  //     .then(() => {
  //       // Remember you HAVE TO return this fetch to the subsequent `then()`
  //       this.setState({
  //         ItineraryModal: "",
  //         editItineraryModal: ""
  //       });
  //           alert("Edited Itinerary Item Sucessfully");
  //           return fetch("http://localhost:5002/itineraryItem")
  //             .then(e => e.json())
  //             .then(itinerary =>
  //               this.setState({
  //                 itineraryItem: itinerary.filter(
  //                   itinerary =>
  //                     itinerary.tripId === this.state.tripInfo.id &&
  //                     itinerary.itineraryId === this.props.itinerary.id
  //                 )
  //               })
  //             );
  //         })
  //         .then(
  //           //this the username, and then sets the state of itinerary to be equal to a list of itineraries that is filtered by the trip number
  //           () => {
  //             this.props.getTripInfo(this.props.state.tripInfo.id);
  //           }
  //         );
  // };

  // getItineraryInfoForEdit = () => {
  //   return APIHandler.getItineraryItemData(this.state.targId);
  // };

  // editItineraryModal = event => {
  //   let targId = event.target.parentNode.id;

  //   if (document.querySelector(".modal") !== null) {
  //     this.setState(
  //       {
  //         editItineraryModal: "",
  //         // editItinerary: "",
  //         targId: targId,
  //         ItineraryModal: ""
  //       },
  //       () => {
  //         this.getItineraryInfoForEdit(this.state.targId).then(response => {
  //           console.log(this.editItinerary);
  //           this.setState(
  //             {
  //               targInfo: { response }
  //             },
  //             () => {
  //               this.setState(
  //                 {
  //                   editItineraryModal: (
  //                     <EditItineraryModal
  //                       editItinerary={this.editItinerary}
  //                       {...this.props}
  //                       handleFieldChange={this.handleFieldChange}
  //                       targId={this.state.targId}
  //                       targInfo={this.state.targInfo.response}
  //                     />
  //                   )
  //                 },
  //                 () => {
  //                   document.querySelector(".modal").classList.add("is-active");
  //                 }
  //               );
  //             }
  //           );
  //         });
  //       }
  //     );
  //   } else {
  //     this.setState(
  //       {
  //         editItineraryModal: "",
  //         targId: targId,
  //         ItineraryModal: ""
  //       },
  //       () => {
  //         this.getItineraryInfoForEdit(this.state.targId).then(response => {
  //           console.log(this.editItinerary);
  //           this.setState(
  //             {
  //               targInfo: { response }
  //             },
  //             () => {
  //               this.setState(
  //                 {
  //                   editItineraryModal: (
  //                     <EditItineraryModal
  //                       editItinerary={this.editItinerary}
  //                       {...this.props}
  //                       handleFieldChange={this.handleFieldChange}
  //                       targId={this.state.targId}
  //                       targInfo={this.state.targInfo.response}
  //                     />
  //                   )
  //                 },
  //                 () => {
  //                   document.querySelector(".modal").classList.add("is-active");
  //                 }
  //               );
  //             }
  //           );
  //         });
  //       }
  //     );
  //   }
  // };

  render() {
    return (
      <div className="card item">
        {
          <div className="card-body">
            <h5 className="card-title">{this.props.itinerary.ItineraryName}</h5>
          </div>
        }

        {this.state.itineraryItem.map(itinerary => {
          return (
            <div className="card">
              <div className="card-body" id={itinerary.id}>
                <h5 className="card-title">{itinerary.ItineraryName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {" "}
                  {itinerary.startTime} to {itinerary.endTime}
                </h6>
                <img src={require("./edit-solid.svg")} id="edtBtn" onClick={this.props.editItineraryModal}/>
                <img
                  src={require("./trash-alt-solid.svg")}
                  id="deleteBtn"
                  onClick={this.deleteItineraryItem}
                />
              </div>
            </div>
          );
        })}
        {this.state.ItineraryModal}
        {this.props.editItineraryModalState}
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
      </div>
    );
  }
}
