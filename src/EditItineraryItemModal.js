import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Button } from "bloomer";

export default class EditItineraryModal extends Component {
    turnInactive = () => {
        document.querySelector(".modal").classList.remove("is-active")
    }
    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>Edit Itinerary Item</ModalCardTitle>
      <Delete onClick={this.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Itinerary Item Title:</Label>
        <Control>
          <Input type="text" defaultValue={this.props.targInfo.ItineraryName} id="ItineraryName" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field>
        <Label>Start Time:</Label>
        <Control >
          <Input defaultValue={this.props.targInfo.startTime} id="startTime" type="time" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field>
        <Label>End Time:</Label>
        <Control >
          <Input defaultValue={this.props.targInfo.endTime} id="endTime" type="time" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={this.props.editItinerary}>Submit</Button>
        </Control>
        <Control onClick={this.turnInactive}>
          <Button >Cancel</Button>
        </Control>
      </Field>
    </ModalCardBody>
  </ModalCard>
</Modal>
        )}
}
