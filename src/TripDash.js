//William Kimball 2018
//This file builds each trip's dashboard.

import React, { Component } from "react";


export default class TripDash extends Component {
    tripId = () => {
        let tripId = this.props.props.location.pathname.substring(10);
        return tripId
    }

    getTripInfo = (tripId) => {
        console.log(tripId)
        
    }


    render() {
        this.getTripInfo(this.tripId())
      return (
        
         <h1>Yo</h1>
      );
    }
  }
  
