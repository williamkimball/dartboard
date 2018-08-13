//William Kimball 2018
//This file builds each trip card

import "./Trip.css";
import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import { Button, Image, Subtitle } from "bloomer";

// import { Link } from "react-router-dom";
// import EditTripForm from "./EditTripForm";

export default class Trip extends Component {
  state = {
    image: "",
    imagePic: ""
  };

  styles = {
    marginLeft: "35%"
  };
  getImage = async destination => {
    // console.log(destination)
    var s = destination;
    var n = s.indexOf(",");
    s = s.substring(0, n != -1 ? n : s.length);
    console.log(s);

    const json = await fetch(
      `https://api.unsplash.com/photos/random/?query=${s}&client_id=38b469e4ae6b45d6f859a5ce65ad4a6a0b06fc792cab0d16cc7bf052a396384c`
    )
      .then(response => response.json())
      .then(image => {
        this.setState({
          image: image,
          imagePic: image.urls.regular,
          imageUser: image.user.name,
          imageUserLink: image.user.links.html,
          imageLink: image.links.html,
          imageAlt: image.description
        });
      });
  };

  componentDidMount() {
    this.getImage(this.props.trip.title).then(() => {
      console.log(this.state.image);
    });
  }
  render() {
    return (
      <div className="card item p-3" id={this.props.trip.id}>
        {
          <div className="card-body" id={this.props.trip.id}>
            <h5 className="card-title">{this.props.trip.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.props.trip.startDate} to {this.props.trip.endDate}
            </h6>
            <Image isRatio="4:3" src={this.state.imagePic} alt={this.state.imageAlt}/>
            <Subtitle isSize={6} className="smallAttribution">
              Photo by{" "}
              <a href={this.state.imageUserLink} target="_blank">
                {this.state.imageUser}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/" target="_blank">
                Unsplash
              </a>
            </Subtitle>
            <img
              src={require("./edit-solid.svg")}
              id="edtBtn"
              alt="edit pen"
              onClick={this.props.editTrip}
            />
            <img
              src={require("./trash-alt-solid.svg")}
              id="deleteBtn"
              alt="delete Trash Can"
              onClick={this.props.deleteTrip}
            />
            <Button
              id={this.props.trip.id}
              isColor="info"
              onClick={this.props.goToTrip}
              style={this.styles}
            >
              Go to Trip
            </Button>
            {this.props.editTripModal}
          </div>
        }
      </div>

      // <Card id={this.props.trip.id}>
      //   <CardHeader>
      //     <CardHeaderTitle>{this.props.trip.title}
      //     <small>
      //         {this.props.trip.startDate} to {this.props.trip.endDate}
      //       </small></CardHeaderTitle>

      //     {/* <CardHeaderIcon>
      //       <Icon className="fa fa-angle-down" />
      //     </CardHeaderIcon> */}
      //   </CardHeader>
      //   <CardImage>
      //     <Image isRatio="4:3" src={this.state.image} />
      //   </CardImage>
      //   {this.props.editTripModal}
      //   <Button
      //     isColor="info"
      //     onClick={this.props.goToTrip}
      //     id={this.props.trip.id}
      //     className="goToTripButton"
      //   >
      //     {" "}
      //     Go to Trip
      //   </Button>
      //   <CardContent className="tripCardButtonColor">
      //     <Image
      //       src={require("./edit-solid.svg")}
      //       id="edtBtn"
      //       alt="edit pen"
      //       onClick={this.props.editTrip}
      //       className="edtBtn"
      //     />
      //     <Image
      //       src={require("./trash-alt-solid.svg")}
      //       id="deleteBtn"
      //       alt="delete Trash Can"
      //       onClick={this.props.deleteTrip}
      //       className="deleteBtn"
      //     />
      //   </CardContent>
      // </Card>
    );
  }
}
