import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
// import { geolocated } from "react-geolocated";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 13
  };
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0
    }
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAG2xOBvCbK31Ztsidj_jbcxB9_GBhZLX4" }}
          center={this.state.currentLatLng}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
