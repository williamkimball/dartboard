//William Kimball 2018
//This file builds an input form for adding a new trip item

import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {
  Modal,
  ModalBackground,
  ModalCardBody,
  Delete,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Field,
  Label,
  Control,
  Input,
  Button
} from "bloomer";

export default class editTripModal extends Component {
  turnInactive = () => {
    document.querySelector(".modal").classList.remove("is-active");
  };

  render() {
    return (
      <Modal>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Edit Trip</ModalCardTitle>
            <Delete onClick={this.turnInactive} />
          </ModalCardHeader>
          <ModalCardBody>
            <Field>
              <Label>Trip Name:</Label>
              <Control>
                <Input
                  defaultValue={this.props.targInfo.title}
                  onChange={this.props.handleFieldChange}
                  type="text"
                  id="tripName"
                  required
                  autoFocus=""
                />
              </Control>
            </Field>

            <Field>
              <Label>Start Date</Label>
              <Control>
                <Input
                  defaultValue={this.props.targInfo.startDate}
                  onChange={this.props.handleFieldChange}
                  type="date"
                  id="startDate"
                  required
                />

              </Control>
            </Field>
            <Field>
              <Label>End Date</Label>
              <Control>
                <Input
                  defaultValue={this.props.targInfo.endDate}
                  onChange={this.props.handleFieldChange}
                  type="date"
                  id="endDate"
                  required
                />

              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                <Button isColor="primary" onClick={this.props.editTrip}>
                  Submit
                </Button>
              </Control>
              <Control onClick={this.turnInactive}>
                <Button>Cancel</Button>
              </Control>
            </Field>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
}
