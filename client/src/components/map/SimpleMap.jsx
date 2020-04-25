import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
// import { geolocated } from "react-geolocated";
import { googleKey } from "../../config.json";
//const AnyReactComponent = ({ text }) => <div>{text}</div>;
import { googleObjects } from "../../Utils/httpRequest/GoogleRequest";

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 13,
  };
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
    //else
  };
  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleKey, language: "en" }}
          center={this.state.currentLatLng}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => googleObjects(map, maps)}
        >
          {/* <AnyReactComponent lat= lng={0} text="My Marker" /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
