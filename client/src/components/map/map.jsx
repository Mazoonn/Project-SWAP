import React, { Component } from "react";
import { googleKey } from "../../config.json";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

class Map extends Component {
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        currentLatLng: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
    });
  }
  render() {
    return (
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=geometry,drawing,places&language=en`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: `700px` }} />}
        mapElement={<div style={{ height: "100%" }} />}
        center={this.state.currentLatLng}
      />
    );
  }
}

export default Map;

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={props.center}
      options={{ streetViewControl: false }}
    ></GoogleMap>
  ))
);
