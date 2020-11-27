import React from "react";
import "../../css/compass.css";
import { googleKey } from "../../config.json";
import { arrayMove, arrayRemove } from "react-movable";
import Removable from "../dnd-list/dndList";
import DropDown from "./../dnd-list/drodDown";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  BicyclingLayer,
  TrafficLayer,
} from "@react-google-maps/api";

const removeDuplicates = (array) => {
  const arrayOfPlaces = [];
  let obj = {};
  let withoutDuplicates = [];

  if (array.length !== 0) {
    for (let places of array) {
      if (places) {
        for (let place of places) {
          arrayOfPlaces.push(place);
        }
      }
    }
    for (const place of arrayOfPlaces) {
      obj[place.place_id] = place;
    }
  }
  withoutDuplicates = [[...Object.values(obj)]];
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

  const [position, setPosition] = React.useState({ lat: 0, lng: 0 });

  const [radioValue, setradioValue] = React.useState("walk");

  const [isFinished, setIsFinished] = React.useState(false);

  let finished = window.localStorage.getItem("isFinished");
  if (finished === null) finished = false;

  if (finished && !isFinished) {
    setradioValue(window.localStorage.getItem("radioValue"));
    setRoute(JSON.parse(window.localStorage.getItem("route")));
    setChosenPlaces(JSON.parse(window.localStorage.getItem("places")));
    setIsFinished(true);
    setPlaces([[...JSON.parse(window.localStorage.getItem("places"))]]);
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
    setradioValue(changeEvent.target.value);
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
          location: cplaces[i].geometry.location,
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
        destination: cplaces[cplaces.length - 1].geometry.location,
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

  const draggPlace = (oldIndex, newIndex) => {
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

    if (places.length !== 0) {
      places.forEach((p, indexPlaces) => {
        p.forEach((place, indexPlace) => {
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
                allPlaces[indexPlaces][indexPlace].isSelected = true;
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
            ></Marker>
          );
        });
      });
    }

    return markers;
  }, [places, isFinished]);

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
  }, []);


  const getInfoWindows = () => {
    let arrInfoWindows = [];
    places.forEach((p, indexPlaces) => {
      p.forEach((place, indexPlace) => {
        arrInfoWindows.push(
          (place.isSelected !== undefined ? place.isSelected : false) && (
            <InfoWindow
              key={`${place.place_id}InfoWindow`}
              onCloseClick={() => {
                const allPlaces = [...places];
                allPlaces[indexPlaces][indexPlace].isSelected = false;
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
                          arrPlaces[indexPlaces][indexPlace].isChosen = true;
                          arrPlaces[indexPlaces][indexPlace].chosenIndex =
                            chosenPlaces.length;
                          arrPlaces[indexPlaces][indexPlace].isSelected = false;
                          arrChosenPlaces.push(
                            arrPlaces[indexPlaces][indexPlace]
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
          )
        );
      });
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
            dragg={draggPlace}
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

        {getInfoWindows()}
      </GoogleMap>
    </React.Fragment>
  );
}
