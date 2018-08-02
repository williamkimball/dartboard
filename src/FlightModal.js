import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Icon, Button } from "bloomer";

export default class FlightForm extends Component {
    turnInactive = () => {
        document.querySelector(".modal").classList.remove("is-active")
        // this.setState({FlightModal: ""})
    }
    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>New Flight</ModalCardTitle>
      <Delete onClick={this.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Flight Name:</Label>
        <Control>
          <Input type="text" placeholder="Flight Title" onChange={this.props.handleFieldChange} id="FlightName"/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Number:</Label>
        <Control>
          <Input type="text" placeholder="Flight Title" onChange={this.props.handleFieldChange} id="FlightNumber"/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Origin:</Label>
        <Control>
          <Input type="text" placeholder="Flight Title" onChange={this.props.handleFieldChange} id="FlightOrigin"/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Destination:</Label>
        <Control>
          <Input type="text" placeholder="Flight Title" onChange={this.props.handleFieldChange} id="FlightDestination"/>
        </Control>
      </Field>
      <Field>
        <Label>Depart Date:</Label>
        <Control >
          <Input type="date" placeholder="$1234" onChange={this.props.handleFieldChange} id="FlightStartDate"/>
          <Icon isSize="small" isAlign="left">
            <span className="fa fa-user" aria-hidden="true" />
          </Icon>
          <Icon isSize="small" isAlign="right">
            <span className="fa fa-check" aria-hidden="true" />
          </Icon>
        </Control>
      </Field>
      <Field>
        <Label>Return Date:</Label>
        <Control >
          <Input type="date" placeholder="$1234" onChange={this.props.handleFieldChange} id="FlightEndDate"/>
          <Icon isSize="small" isAlign="left">
            <span className="fa fa-user" aria-hidden="true" />
          </Icon>
          <Icon isSize="small" isAlign="right">
            <span className="fa fa-check" aria-hidden="true" />
          </Icon>
        </Control>
      </Field>
      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={this.props.addNewFlight}>Submit</Button>
        </Control>
        <Control onClick={this.turnInactive}>
          <Button>Cancel</Button>
        </Control>
      </Field>
    </ModalCardBody>
  </ModalCard>
</Modal>
        )}
}
