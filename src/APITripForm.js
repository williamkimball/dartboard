import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Icon, Button } from "bloomer";

export default class FindFlightForm extends Component {
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
        <Label>Flight Origin:</Label>
        <Control>
          <Input type="text" required placeholder="BNA" onChange={this.props.handleFieldChange} id="FindFlightOrigin"/>
        </Control>
      </Field>
      <Field>
        <Label>Depart Date:</Label>
        <Control >
          <Input type="date" required placeholder="7/4/2018" onChange={this.props.handleFieldChange} id="FindFlightStartDate"/>
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
          <Button isColor="primary" type="submit" onClick={this.props.FindFlight}>Submit</Button>
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
