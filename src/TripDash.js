//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";

export default class TripDash extends Component {
  // tripId = () => {
  //     let tripId = this.props.props.location.pathname.substring(10);
  //     return tripId
  // }

  // getTripInfo = (tripId) => {
  //     console.log(tripId)

  // }

  render() {
    return (
      <div className="card">
        {
          <div className="card-body">
            <h5 className="card-title" />
            <h6 className="card-subtitle mb-2 text-muted" />
          </div>
        }
      </div>
    );
  }
}
