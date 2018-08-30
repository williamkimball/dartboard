import React, { Component } from "react";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Button } from "bloomer";

export default class ItineraryForm extends Component {

    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>Add Item</ModalCardTitle>
      <Delete onClick={this.props.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Itinerary Item Title:</Label>
        <Control>
          <Input type="text" placeholder="Visit the Pyramids" id="ItineraryName" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field>
        <Label>Start Time:</Label>
        <Control >
          <Input placeholder="" id="startTime" type="time" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field>
        <Label>End Time:</Label>
        <Control >
          <Input placeholder="" id="endTime" type="time" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={this.props.addNewItinerary}>Submit</Button>
        </Control>
        <Control onClick={this.props.turnInactive}>
          <Button >Cancel</Button>
        </Control>
      </Field>
    </ModalCardBody>
  </ModalCard>
</Modal>
        )}
}