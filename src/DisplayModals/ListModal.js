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
      <ModalCardTitle>New List</ModalCardTitle>
      <Delete onClick={this.props.turnListModalInactive}/>
    </ModalCardHeader>
    <ModalCardBody>
      <Field>
        <Label>New List Title:</Label>
        <Control>
          <Input type="text" placeholder="Useful Vocabulary" id="ListName" onChange={this.props.handleFieldChange}/>
        </Control>
      </Field>

      <Field isGrouped>
        <Control>
          <Button isColor="primary" onClick={this.props.addList}>Submit</Button>
        </Control>
        <Control onClick={this.props.turnListModalInactive}>
          <Button >Cancel</Button>
        </Control>
      </Field>
    </ModalCardBody>
  </ModalCard>
</Modal>
        )}
}