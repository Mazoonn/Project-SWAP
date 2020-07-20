import React, { Component } from "react";
import Map from "../components/map/map";
// import Location from "./locationTest";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>Welcome to the Home Page!</div>
        <Map
          places={
            (this.props.location.state &&
              this.props.location.state["respones"] &&
              this.props.location.state["respones"]) ||
            []
          }
        ></Map>
      </React.Fragment>
    );
  }
}

export default HomePage;
