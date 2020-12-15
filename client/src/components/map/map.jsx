import React from "react";
import "../../css/compass.css";
import { addQuest } from "../../services/QuestService" 
import { getCurrentUser } from './../../services/authService';
import { arrayMove, arrayRemove } from "react-movable";
import Removable from "../dnd-list/dndList";
import DropDown from "./../dnd-list/dropDown";
import InfoWindowPlace from "./InfoWindowPlace";
import InfoWindowEvent from "./InfoWindowEvent";
import InfoWindowBusiness from "./InfoWindowBusiness";
import ModalBusinessProducts from "./ModalBusinessProducts";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  BicyclingLayer,
  TrafficLayer
} from "@react-google-maps/api";
import { getPlaceAddress } from "../../Utils/httpRequest/GoogleRequest";

const getGooglePlaceDTO = async place =>
{
  const date = new Date();
  const googlePlaceDTO = 
  {
    main_id: place.ids.main_id,
    sub_id: place.ids.sub_id,
  };
  googlePlaceDTO.googlePlace = 
  {
    place_id: place.place_id,
    creation_date: date,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    name: place.name,
  };
  const address = await getPlaceAddress(place.place_id);

  googlePlaceDTO.googlePlace = Object.assign(googlePlaceDTO.googlePlace, address);

  return googlePlaceDTO;
};

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

const setPlacesFromChosenPlaces = (places, setGooglePlaces, setEventsPlaces, setBusinesses) =>
{
  const google = [];
  const events = [];
  const businesses = [];

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
        case "business" :
          businesses.push(place);
        break;
        default :
        break;
      }
    });
    setGooglePlaces(google);
    setEventsPlaces(events);
    setBusinesses(businesses);
};


const mapContainerStyle = {
  height: "80vh",
  width: "96vw",
};

const options = {
  styles: [{featureType: "transit" , stylers: [{ visibility: "off" }]} ,{ featureType: "poi", stylers: [{ visibility: "off" }] }],
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

const Map = (props) => {

  const [route, setRoute] = React.useState(undefined);

  const [chosenPlaces, setChosenPlaces] = React.useState([]);

  const [places, setPlaces] = React.useState(props.places);

  const [events, setEvents] = React.useState(props.events);

  const [businesses, setBusinesses] = React.useState(props.businesses);

  const [position, setPosition] = React.useState({ lat: 0, lng: 0 });

  const [radioValue, setRadioValue] = React.useState("walk");

  const [isFinished, setIsFinished] = React.useState(false);

  const [businessModal, setBusinessModal] = React.useState({});

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);


  const handleFinish = async () => {
    const storage = window.localStorage;
    const user = getCurrentUser();
    const request = {};

    if(user)
    {
      request.userId = user["user-id"];
      request.eventsIds = [];
      request.googlePlaces = [];
      request.businessesIds = [];
      for(const place of chosenPlaces)
      {
        switch(place.type)
        {
          case "event":
            request.eventsIds.push(place.place_id);
            break;
          case "business":
            request.businessesIds.push(place.place_id);
            break;
          case "google":
            const googlePlace = await getGooglePlaceDTO(place);
            request.googlePlaces.push(googlePlace);
            break;
          default: 
        }
      }
      addQuest(request);   
      storage.setItem("radioValue", radioValue);
      storage.setItem("isFinished", true);
      storage.setItem("places", JSON.stringify(chosenPlaces));
      storage.setItem("route", JSON.stringify(route));
      setIsFinished(true);
    }
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

  const removeChosenPlace = (indexChosenPlace) => {
    if(typeof indexChosenPlace !== "undefined")
    {
      if(chosenPlaces[indexChosenPlace].type === "google") handleUnChooseGoogle(chosenPlaces[indexChosenPlace].indexPlace);
      if(chosenPlaces[indexChosenPlace].type === "business") handleUnChooseBusinesses(chosenPlaces[indexChosenPlace].indexPlace);
      if(chosenPlaces[indexChosenPlace].type === "event") handleUnChooseEvents(chosenPlaces[indexChosenPlace].indexPlace);
    }
    const cPlaces = setIndexes(
      typeof indexChosenPlace !== "undefined"
        ? arrayRemove(chosenPlaces, indexChosenPlace)
        : chosenPlaces
    );
    if (cPlaces.length > 0) getRoute(cPlaces, radioValue);
    else setRoute(undefined);
    setChosenPlaces(cPlaces);
  };

  const onClickGoogleMarker = index =>
  {
    const allPlaces = [...places];
    allPlaces[index].isSelected = true;
    setPlaces(allPlaces);
  };

  const getMarkers = () => {
    const markers = [];

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
              onMouseDown={() => {onClickGoogleMarker(indexPlaces)}}
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
  };

  const getEventsMarkers = () => 
  {
    const markers = [];
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
              onMouseDown={() => {onClickEventMarker(index)}}
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
              onMouseDown={() => {onClickBusinessMarker(index)}}
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
      <button onClick={getLocation} className="locate m-2" title="Current Location">
        <img src="/img/compass.png" alt="compass" />
      </button>
    );
  };

  React.useEffect(() => {
    let finished = window.localStorage.getItem("isFinished");
    if (finished === null) finished = false;
  
    if (finished && !isFinished) {
      const chosenPlaces = JSON.parse(window.localStorage.getItem("places")); 
      setRadioValue(window.localStorage.getItem("radioValue"));
      setRoute(JSON.parse(window.localStorage.getItem("route")));
      setChosenPlaces(chosenPlaces);
      setIsFinished(true);
      setPlacesFromChosenPlaces(chosenPlaces, setPlaces, setEvents,setBusinesses);
    }
    getLocation();
  }, []);


  const handleSelectEvent = index =>
  {
    const arrEvents = [...events];
    const arrChosenPlaces = [...chosenPlaces];
    arrEvents[index].indexPlace = index;
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
  };

  const handleClosePlace = index =>
  {
    const allPlaces = [...places];
    allPlaces[index].isSelected = false;
    setPlaces(allPlaces);
  };

  const handleCloseEvent = index =>
  {
    const allEvents = [...events];
    allEvents[index].isSelected = false;
    setEvents(allEvents);
  };

  const handleCloseBusiness = index =>
  {
    const allBusinesses = [...businesses];
    allBusinesses[index].isSelected = false;
    setBusinesses(allBusinesses);
  };

  const handleSelectPlace = index =>
  {
    const arrPlaces = [...places];
    const arrChosenPlaces = [...chosenPlaces];
    arrPlaces[index].indexPlace = index;
    arrPlaces[index].isChosen = true;
    arrPlaces[index].chosenIndex =
      chosenPlaces.length;
    arrPlaces[index].isSelected = false;
    arrPlaces[index].type = "google";
    arrChosenPlaces.push(
      arrPlaces[index]
    );
    setChosenPlaces(arrChosenPlaces);
    setPlaces(arrPlaces);
    getRoute(arrChosenPlaces, radioValue);
  };

  const handleSelectBusiness = index =>
  {
    const arrBusinesses = [...businesses];
    const arrChosenPlaces = [...chosenPlaces];
    arrBusinesses[index].indexPlace = index;
    arrBusinesses[index].isChosen = true;
    arrBusinesses[index].chosenIndex =
      chosenPlaces.length;
      arrBusinesses[index].isSelected = false;
      arrBusinesses[index].type = "business";
    arrChosenPlaces.push(
      arrBusinesses[index]
    );
    setChosenPlaces(arrChosenPlaces);
    setBusinesses(arrBusinesses);
    getRoute(arrChosenPlaces, radioValue);
  };

  const onClickEventMarker = index =>
  {
    const allEvents = [...events];
    allEvents[index].isSelected = true;
    setEvents(allEvents);
  };

  const onClickBusinessMarker = index =>
  {
    const allBusiness = [...businesses];
    allBusiness[index].isSelected = true;
    setBusinesses(allBusiness);
  };

  const getInfoWindows = () => {
    const arrInfoWindows = [];
    if(places)
    places.forEach((place, indexPlaces) => 
    {
        if((place.isSelected !== undefined ? place.isSelected : false))
        arrInfoWindows.push((
            <InfoWindow
              key={`${place.place_id}InfoWindow`}
              onCloseClick={() => {handleClosePlace(indexPlaces)}}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
            >
              <InfoWindowPlace
                handleSelectPlace={handleSelectPlace}
                indexPlaces={indexPlaces}
                isFinished={isFinished}
                place={place}
                removeChosenPlace={removeChosenPlace}              
               />
            </InfoWindow>));
    });
    if(events)
    events.forEach((event, index)  => 
      {
        if((event.isSelected !== undefined ? event.isSelected : false))
        arrInfoWindows.push(<InfoWindow
          key={`${event.place_id}InfoWindow`}
          onCloseClick={() => {handleCloseEvent(index)}}
          position={{
            lat: event.lat,
            lng: event.lng,
          }}
        >
          <InfoWindowEvent 
            handleCloseEvent={handleCloseEvent}
            addressString={addressString}
            dateString={dateString}
            event={event}
            handleSelectEvent={handleSelectEvent}
            isFinished={isFinished}
            removeChosenPlace={removeChosenPlace}
            index={index}
          />
        </InfoWindow>);
      });
    if(businesses)
    businesses.forEach((business, index) => 
    {
      if((business.isSelected !== undefined ? business.isSelected : false))
      arrInfoWindows.push(<InfoWindow
        key={`${business.place_id}InfoWindow`}
        onCloseClick={() => {handleCloseBusiness(index)}}
        position={{
          lat: business.lat,
          lng: business.lng,
        }}
      >
        <InfoWindowBusiness
          isFinished={isFinished}
          addressString={addressString}
          business={business}
          handleSelectBusiness={handleSelectBusiness}
          index={index}
          removeChosenPlace={removeChosenPlace}
          openModal={handleOpenModal}
        />
        </InfoWindow>);
    });  

    return arrInfoWindows;
  };

  const handleUnChooseEvents = index =>
  {
    const newEvents = [...events];
    newEvents[index].isSelected = false;
    newEvents[index].isChosen = false;
    setEvents(newEvents);
  };

  const handleUnChooseBusinesses = index =>
  {
    const newBusinesses = [...businesses];
    newBusinesses[index].isSelected = false;
    newBusinesses[index].isChosen = false;
    setBusinesses(newBusinesses);
  };

  const handleUnChooseGoogle = index =>
  {
    const newPlaces = [...places];
    newPlaces[index].isSelected = false;
    newPlaces[index].isChosen = false;
    setPlaces(newPlaces);
  };

  const handleOpenModal = business => 
  {
    setBusinessModal(business);
  };

  const handleCloseModal = () =>
  {
    setBusinessModal({});
  };

  return (
    <React.Fragment>
      {(places.length !== 0 || events.length !== 0 || businesses.length !== 0) && (
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
        mapContainerStyle={mapContainerStyle}
        options={options}
        center={position}
        zoom={16}
        onLoad={onMapLoad}
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
          <ModalBusinessProducts closeModal={handleCloseModal} business={businessModal} />
    </React.Fragment>
  );
}

export default Map;