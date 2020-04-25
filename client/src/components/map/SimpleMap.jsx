import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { googleKey } from "../../config.json";
import { fetchCoordinates } from "../../Utils/httpRequest/GoogleRequest";

const Marker = () => (
  <img style={{ width: 40 }} src="\img\marker.png" alt="marker"></img>
);

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 15,
  };
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
  };

  getLocation = async () => {
    const location = await fetchCoordinates();
    const currentLatLng = {
      lat: location.latitude,
      lng: location.longitude,
    };
    this.setState({ currentLatLng });
  };
  componentDidMount() {
    this.getLocation();
  }

  getMarkers = () => {
    let markers = [];
    if (this.props.places !== undefined)
      this.props.places.forEach((places) => {
        places.forEach((place) => {
          markers.push(
            <Marker
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
            ></Marker>
          );
        });
      });
    return markers;
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleKey, language: "en" }}
          center={this.state.currentLatLng}
          defaultZoom={this.props.zoom}
        >
          {this.getMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
