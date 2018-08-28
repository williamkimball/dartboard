//William Kimball 2018
//This file builds each flight card

import "./../Trip.css";
import React from "react";
import { Card } from "bloomer";

const List = props => {

  return (
    <Card id={props.list.id} className="customCard">
      {<div id={props.list.listName} class="custCard">{props.list.listItemContent}</div>}
      <img
        src={require("./../trash-alt-solid.svg")}
        id="deleteBtnCust"
        alt="delete Trash Can"
        onClick={props.deleteListItem}
      />
    </Card>
  );
};

export default List;
