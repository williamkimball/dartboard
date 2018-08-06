//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";
import { Button, Column } from "bloomer";
import CustomList from "./CustomList"

const ListTabContent = props => {
    // console.log(props)
  return (
    <div
      className="tab-pane fade"
      id={props.tab.listName}
      role="tabpanel"
      aria-labelledby={props.tab.listName + "-tab"}
    >
      <Button
        isColor="info"
        onClick={props.NewListItem}
        render={props => (
          <Column hasTextAlign="centered">
            <p {...props} >
              New List Item
            </p>
          </Column>
        )}
      />
      <div className="card">
        {props.state.ListItemModal}
        <h2>{props.tab.listName} </h2>
        {props.state.name.map(list => (
          <CustomList
            key={list.id}
            list={list}
            user={props.state.user}
            // state={this.state}
            tripInfo={props.state.tripInfo}
            deleteListItem={props.deleteListItem}
          />
        ))}
      </div>
    </div>
  );
};

export default ListTabContent;
