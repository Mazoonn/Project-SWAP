import React from "react";
import "../../css/compass.css";
import { arrayMove, arrayRemove } from "react-movable";
import Removable from "../dnd-list/dndList";
import DropDown from "./../dnd-list/drodDown";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  BicyclingLayer,
  TrafficLayer,
} from "@react-google-maps/api";

const zeroPrefixNumber = number =>
{
    if(number < 10 && number >= 0) return `0${number}`;
    return number;
};

const dateString = date =>
{
    const d = new Date(date);
    const string = `${zeroPrefixNumber(d.getDate())}/${zeroPrefixNumber(d.getMonth() + 1)}/${d.getFullYear()}`;
    return string;
};

const addressString = ({settlement, street, street_number}) =>
{
  return `${street} ${street_number}, ${settlement}`;
};

const setPlacesFromChosenPlaces = (places, setGooglePlaces, setEventsPlaces) =>
{
  const google = [];
  const events = [];

  places.forEach(place =>
    {
      switch(place.type)
      {
        case "google" :
          google.push(place);
        break;
        case "event" :
          events.push(place);
        break;
        default :
        break;
      }
    });
    setGooglePlaces(google);
    setEventsPlaces(events);
};

const removeDuplicates = (array) => {
  const arrayOfPlaces = [];
  let obj = {};
  let withoutDuplicates = [];
  if (array.length !== 0) {
    for (let item of array) {
      if (item.places) {
        for (let place of item.places) {
          place.ids = item.ids;
          arrayOfPlaces.push(place);
        }
      }
    }
    for (const place of arrayOfPlaces) {
      obj[place.place_id] = place;
    }
  }
  withoutDuplicates = Object.values(obj);
  return withoutDuplicates;
};

const libraries = ["places"];

const mapContainerStyle = {
  height: "80vh",
  width: "96vw",
};

const options = {
  styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
  disableDefaultUI: true,
  zoomControl: true,
};

const setIndexes = (places) => {
  const newPlaces = [...places];
  newPlaces.forEach((place, index) => {
    place.chosenIndex = index;
  });
  return newPlaces;
};

export default function Map(props) {

  const [route, setRoute] = React.useState(undefined);

  const [chosenPlaces, setChosenPlaces] = React.useState([]);

  const [places, setPlaces] = React.useState(
    removeDuplicates([...props.places])
  );

  const [events, setEvents] = React.useState(props.events);

  const [businesses, setBusinesses] = React.useState(props.businesses);

  const [position, setPosition] = React.useState({ lat: 0, lng: 0 });

  const [radioValue, setRadioValue] = React.useState("walk");

  const [isFinished, setIsFinished] = React.useState(false);

  let finished = window.localStorage.getItem("isFinished");
  if (finished === null) finished = false;

  if (finished && !isFinished) {
    const chosenPlaces = JSON.parse(window.localStorage.getItem("places")); 
    setRadioValue(window.localStorage.getItem("radioValue"));
    setRoute(JSON.parse(window.localStorage.getItem("route")));
    setChosenPlaces(chosenPlaces);
    setIsFinished(true);
    setPlacesFromChosenPlaces(chosenPlaces, setPlaces, setEvents);
  }

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);


  const handleFinish = () => {
    const storage = window.localStorage;
    storage.setItem("radioValue", radioValue);
    storage.setItem("isFinished", true);
    storage.setItem("places", JSON.stringify(chosenPlaces));
    storage.setItem("route", JSON.stringify(route));
    setIsFinished(true);
  };

  const handleRadioOnChange = (changeEvent) => {
    setRadioValue(changeEvent.target.value);
    if (chosenPlaces.length !== 0)
      getRoute(chosenPlaces, changeEvent.target.value);
  };

  const getRoute = (cplaces, rmode) => {
    const DirectionsService = new window.google.maps.DirectionsService();
    const waypoints = [];
    let mode;
    if (cplaces.length > 1) {
      for (var i = 0; i < cplaces.length - 1; i++)
        waypoints.push({
          location: cplaces[i].type === "google" ? cplaces[i].geometry.location : {lat:cplaces[i].lat, lng:cplaces[i].lng},
          stopover: true,
        });
    }
    switch (rmode) {
      case "walk":
        mode = window.google.maps.TravelMode.WALKING;
        break;
      case "bicycle":
        mode = window.google.maps.TravelMode.BICYCLING;
        break;
      case "car":
        mode = window.google.maps.TravelMode.DRIVING;
        break;
      default:
        break;
    }
    DirectionsService.route(
      {
        origin: position,
        waypoints: waypoints,
        destination: cplaces[cplaces.length - 1].type === "google" ? cplaces[cplaces.length - 1].geometry.location : {lat:cplaces[cplaces.length - 1].lat, lng:cplaces[cplaces.length - 1].lng},
        travelMode: mode,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setRoute(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const dragPlace = (oldIndex, newIndex) => {
    const newArr = setIndexes(arrayMove(chosenPlaces, oldIndex, newIndex));
    setChosenPlaces(setIndexes(arrayMove(chosenPlaces, oldIndex, newIndex)));
    getRoute(newArr, radioValue);
  };

  const removeChosenPlace = (index) => {
    chosenPlaces[index].isChosen = false;
    const cPlaces = setIndexes(
      typeof index !== "undefined"
        ? arrayRemove(chosenPlaces, index)
        : chosenPlaces
    );
    if (cPlaces.length > 0) getRoute(cPlaces, radioValue);
    else setRoute(undefined);
    setChosenPlaces(cPlaces);
  };

  const getMarkers = React.useCallback(() => {
    let markers = [];

      places.forEach((place, indexPlaces) => 
      {
          markers.push(
            <Marker
              visible={
                isFinished
                  ? place.isChosen !== undefined
                    ? place.isChosen
                    : false
                  : true
              }
              key={`${place.place_id}Marker`}
              onClick={() => {
                const allPlaces = [...places];
                allPlaces[indexPlaces].isSelected = true;
                setPlaces(allPlaces);
              }}
              label={
                ((place.isChosen !== undefined ? place.isChosen : false) && {
                  color: "white",
                  fontSize: "25px",
                  text: (place.chosenIndex + 1).toString(),
                }) || {
                  fontSize: "17px",
                  fontWeight: "bold",
                  text: place.name,
                }
              }
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              title={place.name}
              icon={
                (!(place.isChosen !== undefined ? place.isChosen : false) && {
                  url: place.icon,
                  labelOrigin: new window.google.maps.Point(15, 40),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }) ||
                undefined
              }
            ></Marker>);
      });


    return markers;
  }, [places, isFinished]);


  const getEventsMarkers = () => 
  {
    let markers = [];
      if(events)
      events.forEach((event, index) => 
      {
          markers.push(
            <Marker
              visible={
                isFinished ? event.isChosen !== undefined
                    ? event.isChosen
                    : false
                  : true
              }
              onClick={() => {
                const allEvents = [...events];
                allEvents[index].isSelected = true;
                setEvents(allEvents);
              }}
              key={`${event.place_id}Marker`}
              label={
                ((event.isChosen !== undefined ? event.isChosen : false) && {
                  color: "white",
                  fontSize: "25px",
                  text: (event.chosenIndex + 1).toString(),
                }) || {
                  fontSize: "17px",
                  fontWeight: "bold",
                  text: event.name,
                }
              }
              position={{
                lat: event.lat,
                lng: event.lng,
              }}
              title={event.name}
            ></Marker>);
      });
    return markers;
  }

  const getBusinessesMarkers = () => 
  {
    let markers = [];
      if(businesses)
      businesses.forEach((business, index) => 
      {
          markers.push(
            <Marker
              visible={
                isFinished ? business.isChosen !== undefined
                    ? business.isChosen
                    : false
                  : true
              }
              onClick={() => {
                const allBusiness = [...businesses];
                allBusiness[index].isSelected = true;
                setEvents(allBusiness);
              }}
              key={`${business.place_id}Marker`}
              label={
                ((business.isChosen !== undefined ? business.isChosen : false) && {
                  color: "white",
                  fontSize: "25px",
                  text: (business.chosenIndex + 1).toString(),
                }) || {
                  fontSize: "17px",
                  fontWeight: "bold",
                  text: business.name,
                }
              }
              position={{
                lat: business.lat,
                lng: business.lng,
              }}
              title={business.name}
            ></Marker>);
      });
    return markers;
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  const Locate = () => {
    return (
      <button className="locate m-2" title="Current Location">
        <img onClick={getLocation} src="/img/compass.png" alt="compass" />
      </button>
    );
  };

  React.useEffect(() => {
    getLocation();
    if(!isFinished) setEvents(props.events);
  }, [props.events]);


  const getInfoWindows = () => {
    let arrInfoWindows = [];
    places.forEach((place, indexPlaces) => 
    {
        if((place.isSelected !== undefined ? place.isSelected : false))
        arrInfoWindows.push((
            <InfoWindow
              key={`${place.place_id}InfoWindow`}
              onCloseClick={() => {
                const allPlaces = [...places];
                allPlaces[indexPlaces].isSelected = false;
                setPlaces(allPlaces);
              }}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
            >
              <div>
                <span>{`Name: ${place.name}`}</span>
                <br />
                <span>{`Rating: ${place.rating}`}</span>
                <br />
                <span>{`Total user ratings: ${place.user_ratings_total}`}</span>
                <br />
                <span>{`Address: ${place.vicinity}`}</span>
                <br />
                <br />
                <div className="text-center">
                  {!isFinished &&
                    ((!(place.isChosen !== undefined
                      ? place.isChosen
                      : false) && (
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          const arrPlaces = [...places];
                          const arrChosenPlaces = [...chosenPlaces];
                          arrPlaces[indexPlaces].isChosen = true;
                          arrPlaces[indexPlaces].chosenIndex =
                            chosenPlaces.length;
                          arrPlaces[indexPlaces].isSelected = false;
                          arrPlaces[indexPlaces].type = "google";
                          arrChosenPlaces.push(
                            arrPlaces[indexPlaces]
                          );
                          setChosenPlaces(arrChosenPlaces);
                          setPlaces(arrPlaces);
                          getRoute(arrChosenPlaces, radioValue);
                        }}
                      >
                        Select
                      </button>
                    )) || (
                      <button
                        onClick={() => {
                          place.isSelected = false;
                          removeChosenPlace(place.chosenIndex);
                        }}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    ))}
                </div>
              </div>
            </InfoWindow>
          ));
    });
    if(events)
    events.forEach((event, index)  => 
      {
        if((event.isSelected !== undefined ? event.isSelected : false))
        arrInfoWindows.push(<InfoWindow
          key={`${event.place_id}InfoWindow`}
          onCloseClick={() => 
            {
              const allEvents = [...events];
              allEvents[index].isSelected = false;
              setEvents(allEvents);
            }}
          position={{
            lat: event.lat,
            lng: event.lng,
          }}
        >
          <div>
            <h4>Event</h4>
            <span>{`Name: ${event.name}`}</span>
            <br />
            <span>{`Description: ${event.description}`}</span>
            <br />
            <span>{`Price: ${event.price} $`}</span>
            <br />
            <span>{`Start Date: ${dateString(event.start_date)}`}</span>
            <br />
            <span>{`End Date: ${dateString(event.end_date)}`}</span>
            <br />
            <span>{`Address: ${addressString({
              settlement: event.settlement,
              street: event.street,
              street_number: event.street_number
               })}`}</span>
            <br />
            <br />
            <div className="text-center">
              {!isFinished &&
                ((!(event.isChosen !== undefined
                  ? event.isChosen
                  : false) && (
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      const arrEvents = [...events];
                      const arrChosenPlaces = [...chosenPlaces];
                      arrEvents[index].isChosen = true;
                      arrEvents[index].chosenIndex =
                        chosenPlaces.length;
                      arrEvents[index].isSelected = false;
                      arrEvents[index].type = "event";
                      arrChosenPlaces.push(
                        arrEvents[index]
                      );
                      setChosenPlaces(arrChosenPlaces);
                      setEvents(arrEvents);
                      getRoute(arrChosenPlaces, radioValue, "events");
                    }}
                  >
                    Select
                  </button>
                )) || (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      event.isSelected = false;
                      removeChosenPlace(event.chosenIndex);
                    }}
                  >
                    Remove
                  </button>
                ))}
            </div>
          </div>
        </InfoWindow>);
      });
    return arrInfoWindows;
  };

  return (
    <React.Fragment>
      {places.length !== 0 && (
        <DropDown
          handleFinish={handleFinish}
          handleRadioChange={handleRadioOnChange}
          radioValue={radioValue}
          timeDistance={route !== undefined ? route.routes[0].legs : route}
          isFinished={isFinished}
        >
          <Removable
            list={chosenPlaces}
            drag={dragPlace}
            removeItem={removeChosenPlace}
          ></Removable>
        </DropDown>
      )}

      <Locate />

      <GoogleMap
        options={options}
        mapContainerStyle={mapContainerStyle}
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
      </GoogleMap>
    </React.Fragment>
  );
}
