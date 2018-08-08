//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {
  Button,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcon,
  Icon,
  Image,
  CardImage,
  CardContent,
  Title,
  Subtitle
} from "bloomer";

// import { Link } from "react-router-dom";
// import EditTripForm from "./EditTripForm";

export default class Trip extends Component {
  state = {
    image: ""
  };
  getImage = async destination => {
    console.log(destination)

    const json = await fetch(
      `https://api.unsplash.com/search/photos/?page=1&per_page=1&query=${destination}&client_id=38b469e4ae6b45d6f859a5ce65ad4a6a0b06fc792cab0d16cc7bf052a396384c`
    )
      .then(response => response.json())
      .then(image => {
        this.setState({ image: image.results[0].urls.regular });
      });
  };

  componentDidMount() {
    this.getImage(this.props.trip.title).then(() => {
      console.log(this.state.image);
    });
  }
  render() {
    return (
      <Card id={this.props.trip.id}>
        <CardHeader>
          <CardHeaderTitle>{this.props.trip.title}</CardHeaderTitle>
          <CardContent>
            <small>
              {this.props.trip.startDate} to {this.props.trip.endDate}
            </small>
          </CardContent>

          <CardHeaderIcon>
            <Icon className="fa fa-angle-down" />
          </CardHeaderIcon>
        </CardHeader>
        <CardImage>
          <Image isRatio="4:3" src={this.state.image} />
        </CardImage>
        {this.props.editTripModal}
        <Button
          isColor="light"
          onClick={this.props.goToTrip}
          id={this.props.trip.id}
        >
          {" "}
          Go to Trip
        </Button>
        <CardContent>
          <Image
            src={require("./edit-solid.svg")}
            id="edtBtn"
            alt="edit pen"
            onClick={this.props.editTrip}
          />
          <Image
            src={require("./trash-alt-solid.svg")}
            id="deleteBtn"
            alt="delete Trash Can"
            onClick={this.props.deleteTrip}
          />
        </CardContent>
      </Card>

      // <div className="card item">
      //   {
      //     <div className="card-body" id={this.props.trip.id}>
      //       <h5 className="card-title">{this.props.trip.title}</h5>
      //       <h6 className="card-subtitle mb-2 text-muted">
      //         {this.props.trip.startDate} to {this.props.trip.endDate}
      //       </h6>
      //       <img
      //         src={require("./edit-solid.svg")}
      //         id="edtBtn"
      //         alt="edit pen"
      //         onClick={this.props.editTrip}
      //       />
      //       <img
      //         src={require("./trash-alt-solid.svg")}
      //         id="deleteBtn"
      //         alt="delete Trash Can"
      //         onClick={this.props.deleteTrip}
      //       />
      //       {props.editTripModal}
      //       <Button isColor="light" onClick={props.goToTrip}>
      //         {" "}
      //         Go to Trip
      //       </Button>
      //     </div>
      //   }
      // </div>
    );
  }
}
