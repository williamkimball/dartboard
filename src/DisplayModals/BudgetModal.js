import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Icon, Button } from "bloomer";
import turnInactive from "./turnInactive.js";

export default class BudgetForm extends Component {
    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>New Budget Item</ModalCardTitle>
      <Delete onClick={turnInactive.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>Budget Item Title:</Label>
        <Control>
          <Input type="text" placeholder="Budget Item Title" id="budgetItemTitle" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field>
        <Label>Price:</Label>
        <Control >
          <Input placeholder="$1234" id="budgetItemPrice" onChange={this.props.handleFieldChange}/>
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
          <Button isColor="primary" onClick={this.props.addNewBudgetItem}>Submit</Button>
        </Control>
        <Control onClick={turnInactive.turnInactive}>
          <Button >Cancel</Button>
        </Control>
      </Field>
    </ModalCardBody>
  </ModalCard>
</Modal>
        )}
}
