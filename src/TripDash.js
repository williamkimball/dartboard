//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";
import APIHandler from "./APIHandler";
// import { Tabs, TabLink, TabList, Tab, Icon } from "bloomer";
import "bulma/css/bulma.css";

export default class TripDash extends Component {
  // tripId = () => {
  //     let tripId = this.props.props.location.pathname.substring(10);
  //     return tripId
  // }

  getTripInfo = tripId => {
    return APIHandler.getTripData(tripId).then(result => {
      this.setState({ tripInfo: result });
    }).then(APIHandler.getData("flight")).then(result => {
        this.setState({ flights: result })
  }).then(APIHandler.getData("itinerary")).then(result => {
    this.setState({ itinerary: result })}).then(APIHandler.getData("budget")).then(result => {
        this.setState({ budget: result })})
}
  componentDidMount() {
    this.getTripInfo(this.props.match.params.anumber);
  }
  //this.state.tripInfo.title
  state = {
    tripInfo: "",
    flights: "",
    itinerary: "",
    budget: "",
    currentInfo: "",
  };

  pillListener = event => {
    //   console.log(event.target.parentNode.textContent)
    if (event.target.classList.contains("active") === false) {
        let tabs = document.getElementsByClassName("active")
        for (let item of tabs) {
            item.classList.remove("active")
        }
      event.target.classList.add("active");
    } else {}
    switch(event.target.parentNode.textContent) {
        case "Itinerary":
            console.log("yo")
            this.setState({currentInfo: this.state.itinerary})
            break;
        case "Flights":
        console.log("yos")
        this.setState({currentInfo: this.state.flights})
            break;
        case "Budget":
        console.log("yoq")
        this.setState({currentInfo: this.state.budget})
            break;
        default:
          console.log("nope")  
    }
    
  };
  render() {
    //   console.log(this.state.tripInfo.title)
    return (
      <div>
        <div className="dashboard-nav alert-info">
          <h2 className="trip-dashboard-head">{this.state.tripInfo.title}</h2>
          <h4 className="trip-dashboard-dates">
            {this.state.tripInfo.startDate} - {this.state.tripInfo.endDate}
          </h4>
        </div>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <button className="nav-link" onClick={this.pillListener}>
              Flights
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link active" onClick={this.pillListener}>
              Itinerary
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={this.pillListener}>
              Budget
            </button>
          </li>
        </ul>
       

      <div>{this.state.currentInfo}</div>
      </div>
    );
  }
}
