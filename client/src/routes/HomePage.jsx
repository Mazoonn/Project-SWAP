import React, { Component } from "react";
import Map from "../components/map/map";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Map
          places={JSON.parse(localStorage.getItem("questPlaces")) || []}
        ></Map>
      </React.Fragment>
    );
  }
}

export default HomePage;
