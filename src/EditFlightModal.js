import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Icon, Button } from "bloomer";

export default class EditFlightForm extends Component {
    turnInactive = () => {
        document.querySelector(".modal").classList.remove("is-active")
    }
    render() {
      // console.log(this.props.targInfo)
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>Edit Flight</ModalCardTitle>
      <Delete onClick={this.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Flight Name:</Label>
        <Control>
          <Input type="text" placeholder="Flight Name" onChange={this.props.handleFieldChange} id="FlightName"defaultValue={this.props.targInfo.FlightName}/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Number:</Label>
        <Control>
          <Input type="text" placeholder="AA1234" onChange={this.props.handleFieldChange} id="FlightNumber" defaultValue={this.props.targInfo.FlightNumber}/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Origin:</Label>
        <Control>
          <Input type="text" placeholder="BNA" onChange={this.props.handleFieldChange} id="FlightOrigin" defaultValue={this.props.targInfo.FlightOrigin}/>
        </Control>
      </Field>
      <Field>
        <Label>Flight Destination:</Label>
        <Control>
          <Input type="text" placeholder="LHR" onChange={this.props.handleFieldChange} id="FlightDestination" defaultValue={this.props.targInfo.FlightDestination}/>
        </Control>
      </Field>
      <Field>
        <Label>Depart Date:</Label>
        <Control >
          <Input type="date" placeholder="7/4/2018" onChange={this.props.handleFieldChange} id="FlightStartDate" defaultValue={this.props.targInfo.FlightStartDate}/>
        </Control>
      </Field>
      <Field>
        <Label>Return Date:</Label>
        <Control >
          <Input type="date" placeholder="12/13/2018" onChange={this.props.handleFieldChange} id="FlightEndDate" defaultValue={this.props.targInfo.FlightEndDate}/>
        </Control>
      </Field>
      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={this.props.editFlight}>Submit</Button>
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
