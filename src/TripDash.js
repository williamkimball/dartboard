//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";
import APIHandler from "./APIHandler";
// import { Tabs, TabLink, TabList, Tab, Icon } from "bloomer";
import "bulma/css/bulma.css";

export default class TripDash extends Component {
  getTripInfo = tripId => {
    return APIHandler.getTripData(tripId)
      .then(result => {
        this.setState({ tripInfo: result });
      })
      .then(APIHandler.getData("flight"))
      .then(result => {
        this.setState({ flights: result });
      })
      .then(APIHandler.getData("itinerary"))
      .then(result => {
        this.setState({ itinerary: result });
      })
      .then(APIHandler.getData("budget"))
      .then(result => {
        this.setState({ budget: result });
      });
  };
  componentDidMount() {
    this.getTripInfo(this.props.match.params.anumber);
  }

  state = {
    tripInfo: "",
    flights: "",
    itinerary: "",
    budget: "",
  };

  currentInfo = ""

  pillListener = event => {
    console.log(event.target);
    if (event.target.classList.contains("active") === false) {
      let tabs = document.getElementsByClassName("active");
      console.log(tabs);
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
        console.log("yo");
        let tabcont = document.getElementsByClassName("show");
        for (let item of tabcont) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("itinerary").classList.add("show");
        document.getElementById("itinerary").classList.add("active");

        this.currentInfo = "Everyone is going to see things differently - and that's the way it should be. We tell people sometimes: we're like drug dealers, come into town and get everybody absolutely addicted to painting. It doesn't take much to get you addicted. There comes a nice little fluffer."

        break;
      case "Flights":
        console.log("yos");
        let tabcont1 = document.getElementsByClassName("show");
        for (let item of tabcont1) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("flights").classList.add("show");
        document.getElementById("flights").classList.add("active");

        this.currentInfo = " Hodor hodor! Hodor, hodor, hodor hodor. HODOR hodor, hodor. Hodor hodor! Hodor? Hodor hodor! HODOR? Hodor hodor. HODOR hodor, hodor. HODOR? Hodor, hodor. Hodor. HODOR HODOR!"

        break;
      case "Budget":
        console.log("yoq");
        let tabcont2 = document.getElementsByClassName("show");
        for (let item of tabcont2) {
          item.classList.remove("show");
          item.classList.remove("active");
        }
        document.getElementById("budget").classList.add("show");
        document.getElementById("budget").classList.add("active");

        this.currentInfo = "Mustache four dollar toast tattooed deep v church-key selvage asymmetrical pabst coloring book post-ironic ethical fam. Cornhole snackwave listicle meh, try-hard irony four dollar toast biodiesel seitan kitsch chambray jean shorts. Authentic health goth thundercats master cleanse, literally hoodie selvage slow-carb. Kinfolk pok pok kogi jianbing brooklyn. Woke freegan migas organic tote bag. Fixie ethical microdosing pop-up shaman cronut vegan brooklyn vape hoodie."

        break;
      default:
        console.log("nope");
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
            {this.currentInfo}
          </div>
          <div
            className="tab-pane fade show active"
            id="itinerary"
            role="tabpanel"
            aria-labelledby="itinerary-tab"
          >
            {this.currentInfo}
          </div>
          <div
            className="tab-pane fade"
            id="budget"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            {this.currentInfo}
          </div>
        </div>
      </div>
    );
  }
}
