import React from 'react';
import { 
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  BicyclingLayer,
  TrafficLayer,
  withScriptjs

} from "react-google-maps"


const WithGoogleMaps = withScriptjs(withGoogleMap(
  ({
    options,
    onMapLoad,
    position,
    chosenPlaces,
    route,
    radioValue,
    getMarkers,
    getEventsMarkers,
    getInfoWindows,
    getBusinessesMarkers
   }) => <GoogleMap
    options={options}
    center={position}
    zoom={16}
    onMapLoad={onMapLoad}
  >
    {chosenPlaces.length !== 0 && (
      <DirectionsRenderer
        options={{ suppressMarkers: true, preserveViewport: true }}
        directions={route}
      ></DirectionsRenderer>
    )}

    {radioValue === "bicycle" && <BicyclingLayer />}
    {radioValue === "car" && <TrafficLayer />}

    <Marker
      clickable={false}
      position={position}
      icon={{
        url: "/img/bluecircle.png",
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(7, 7),
        scaledSize: new window.google.maps.Size(14, 14),
      }}
    ></Marker>
    {getMarkers()}
    {getEventsMarkers()}
    {getInfoWindows()}
    {getBusinessesMarkers()}
  </GoogleMap>));

export default WithGoogleMaps