import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import NavBar from "./Nav/NavBar";
import Dartboard from "./Dartboard";

ReactDOM.render(
  <Router {...this.props}>
    <React.Fragment {...this.props}>
      <NavBar {...this.props}/>
      <Dartboard />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
