import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Icon, Button } from "bloomer";

export default class FlightForm extends Component {
    turnInactive = () => {
        document.querySelector(".modal").classList.remove("is-active")
    }
    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>Find Flight</ModalCardTitle>
      <Delete onClick={this.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Flight Name:</Label>
        <Control>
          <Input type="text" placeholder="Flight Name" onChange={this.props.handleFieldChange} id="FindFlightName"/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Origin:</Label>
        <Control>
          <Input type="text" placeholder="BNA" onChange={this.props.handleFieldChange} id="FindFlightOrigin"/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Destination:</Label>
        <Control>
          <Input type="text" placeholder="LHR" onChange={this.props.handleFieldChange} id="FindFlightDestination"/>
        </Control>
      </Field>
      <Field>
        <Label>Depart Date:</Label>
        <Control >
          <Input type="date" placeholder="7/4/2018" onChange={this.props.handleFieldChange} id="FindFlightStartDate"/>
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
          <Input type="date" placeholder="12/13/2018" onChange={this.props.handleFieldChange} id="FindFlightEndDate"/>
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
          <Button isColor="primary" onClick={this.props.FindFlight}>Submit</Button>
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
