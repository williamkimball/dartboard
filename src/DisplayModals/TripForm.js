//William Kimball 2018
//This file builds an input form for adding a new trip item

import React, { Component } from "react";
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
  Icon,
  Button
} from "bloomer";
import turnInactive from "./turnInactive.js";

export default class TripForm extends Component {

  render() {
    return (
      <Modal>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>New Trip</ModalCardTitle>
            <Delete onClick={this.props.turnAddFlightModalInactive} />
          </ModalCardHeader>
          <ModalCardBody>
            <Field>
              <Label>Trip Name:</Label>
              <Control>
                <Input
                  placeholder="Trip Name"
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
                  onChange={this.props.handleFieldChange}
                  type="date"
                  id="startDate"
                  required
                />
                <Icon isSize="small" isAlign="left">
                  <span className="fa fa-user" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            <Field>
              <Label>End Date</Label>
              <Control>
                <Input
                  onChange={this.props.handleFieldChange}
                  type="date"
                  id="endDate"
                  required
                />
                <Icon isSize="small" isAlign="left">
                  <span className="fa fa-user" aria-hidden="true" />
                </Icon>
              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                <Button isColor="primary" onClick={this.props.addNewTrip}>
                  Submit
                </Button>
              </Control>
              <Control onClick={this.props.turnAddFlightModalInactive}>
                <Button>Cancel</Button>
              </Control>
            </Field>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
}
