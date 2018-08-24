//William Kimball 2018
//This file builds an input form for adding a new trip item

import React from "react";

const EditTripForm = props => {
    
  return (
    <form onSubmit={props.addNewTrip} className="pleaseCenterForm">
      <input
        type="text"
        placeholder="Trip Name"
        id="title"
        onChange={props.handleFieldChange}
      />
      <input
        type="date"
        placeholder="Trip Start Date"
        id="startDate"
        onChange={props.handleFieldChange}
      />
      <input
        type="date"
        placeholder="Trip End Date"
        id="endDate"
        onChange={props.handleFieldChange}
      />
      <button type="submit">Save Trip Edits</button>
    </form>
  );
};

export default EditTripForm;
