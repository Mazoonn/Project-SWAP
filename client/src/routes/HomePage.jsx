import React, { Component } from "react";
import SimpleMap from "../components/map/SimpleMap";
// import Location from "./locationTest";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>Welcome to the Home Page!</div>
        <SimpleMap
          places={
            this.props.location.state &&
            this.props.location.state["respones"] &&
            this.props.location.state["respones"]
          }
        ></SimpleMap>
      </React.Fragment>
    );
  }
}

export default HomePage;
