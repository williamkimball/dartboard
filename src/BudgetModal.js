import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Icon, Button } from "bloomer";

export default class BudgetForm extends Component {
    turnInactive = () => {
        console.log(this.props)
        document.querySelector(".modal").classList.remove("is-active")
    }
    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>New Budget Item</ModalCardTitle>
      <Delete onClick={this.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Budget Item Title:</Label>
        <Control>
          <Input type="text" placeholder="Budget Item Title" />
        </Control>
      </Field>

      <Field>
        <Label>Price:</Label>
        <Control >
          <Input placeholder="$1234" />
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
          <Button isColor="primary">Submit</Button>
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
