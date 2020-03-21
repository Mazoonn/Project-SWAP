import React, { Component } from "react";
import SimpleMap from "./SimpleMap";
// import Location from "./locationTest";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* . <Location /> */}
        <div>Welcome to the Home Page!</div>
        <SimpleMap></SimpleMap>
      </React.Fragment>
    );
  }
}

export default HomePage;
