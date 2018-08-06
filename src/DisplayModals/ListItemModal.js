import React, { Component } from "react";
// import APIHandler from "./APIHandler";
import {Modal, ModalBackground, ModalCardBody, Delete, ModalCard, ModalCardHeader, ModalCardTitle, Field, Label, Control, Input, Button } from "bloomer";

export default class ListForm extends Component {
    turnInactive = () => {
        document.querySelector(".modal").classList.remove("is-active")
    }
    render() {
        return (
<Modal >
  <ModalBackground />
  <ModalCard>
    <ModalCardHeader>
      <ModalCardTitle>New List Item</ModalCardTitle>
      <Delete onClick={this.turnInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>List Item Content:</Label>
        <Control>
          <Input type="text" placeholder="Useful Vocabulary" id="ListItemContent" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={this.props.addListItem}>Submit</Button>
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