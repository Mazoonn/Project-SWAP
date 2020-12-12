import React, { Component } from "react";
import Map from "../components/map/map";

class HomePage extends Component {
  state = {};

  componentDidMount()
  {
    document.title = "Swap";
  };

  render() {
    return (
      <React.Fragment>
        <Map
          places=
          {
            JSON.parse(localStorage.getItem("questPlaces")) || [] 
          }
          events=
          {
            JSON.parse(localStorage.getItem("questEvents")) || []
          }
          businesses=
          {
            JSON.parse(localStorage.getItem("questBusinesses")) || []
          }
        ></Map>
      </React.Fragment>
    );
  }
}

export default HomePage;
