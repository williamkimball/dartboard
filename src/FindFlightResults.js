//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React, { Component } from "react";
import {
  Modal,
  ModalBackground,
  ModalCardBody,
  Delete,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalContent,
  Button
} from "bloomer";
import DestinationBox from "./DestinationBox";

export default class FindFlightResults extends Component {
  turnInactive = () => {
    document.querySelector(".modal").classList.remove("is-active");
  };
  buildFindFlightList = () => {
    let DestinationList = [];
    // Outer loop to create parent
    for (let i = 0; i < 1; i++) {
      let children = [];
      //Inner loop to create children
      for (let key in this.props.FindFlightResults) {
        let destination = "";
        this.props.AirportResults.map(Airport => {
        //   console.log(Airport.term);
        //   console.log(key);
          if (Airport.term === key) {
            // console.log("itsa match");
            destination = Airport.airport.full_location;
          }
        });
        let departureKeyNo = 0 
       let testResultKey = () => {
            if (this.props.FindFlightResults[key][departureKeyNo] === undefined) {
                departureKeyNo += 1
                testResultKey()
            }

        }
        testResultKey()
        let departDate = this.props.FindFlightResults[key][departureKeyNo].departure_at.slice(0, -10);
        let returnDate = this.props.FindFlightResults[key][departureKeyNo].return_at.slice(0, -10);

        // console.log(key);
        children.push(
          <ModalContent className='cardShrink'>
            <h4>{destination}</h4>
            <p>Price: ${this.props.FindFlightResults[key][departureKeyNo].price}</p>{" "}
            <p>
              Depart Date: {departDate}
            </p>
            <p>
              Return Date: {returnDate}
            </p>
            <Button
                  isColor="info"
                  {...this.props}
                  className='buttonShrink'
                  id={key}
                  onClick={this.props.addFoundFlight}

                >
                  Let's Go!
                </Button>
          </ModalContent>
        );
      }
      //Create the parent and add the children
      DestinationList.push(<ModalContent>{children}</ModalContent>);
    }
    return DestinationList;
  };

  // for (let key in this.props.FindFlightResults) {
  //     DestinationList.push(<Box>${key}</Box>)
  // }
  // this.setState({
  //     DestinationList: DestinationList
  // })

  componentDidMount() {
    // console.log(this.props.FindFlightResults);
    this.buildFindFlightList();
  }
  render() {
    return (
      <Modal>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Search Results</ModalCardTitle>
            <Delete onClick={this.turnInactive} />
          </ModalCardHeader>
          <ModalContent>{this.buildFindFlightList()}</ModalContent>
          <ModalCardBody />
        </ModalCard>
      </Modal>
    );
  }
}
