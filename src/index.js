import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import NavBar from "./Nav/NavBar";
import Dartboard from "./Dartboard";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <NavBar />
      <Dartboard />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
