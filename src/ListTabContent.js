//William Kimball 2018
//This file builds each flight card

import "./Trip.css";
import React from "react";
import { Button, Column } from "bloomer";
import CustomList from "./CustomList"


const ListTabContent = props => {
  return (
    <div
      className="tab-pane fade"
      id={props.tab.listName}
      role="tabpanel"
      aria-labelledby={props.tab.listName + "-tab"}
    >
      <div className="card budget-card" id="budgetCard">
        {props.state.ListItemModal}
        <h2>{props.tab.listName} </h2>
        {props.listItemList.map(list => (
          <CustomList
          key={list.id}
          list={list}
          user={props.state.user}
          // state={this.state}
          tripInfo={props.state.tripInfo}
          deleteListItem={props.deleteListItem}
          />
        ))}
        <Button
          isColor="info"
          id="customButton"
          onClick={props.NewListItem}
          render={props => (
            <Column hasTextAlign="centered">
              <p {...props} >
                New List Item
              </p>
            </Column>
          )}
        />
      </div>
    </div>
  );
};

export default ListTabContent;
