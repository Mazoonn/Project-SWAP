import React from "react";
import { googleKey } from "../../config.json";
import Dropdown from "react-bootstrap/Dropdown";
import { arrayMove, arrayRemove } from "react-movable";
import Removable from "../dnd-list/dndList";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleKey,
    language: "en",
    libraries,
  });

  const [chosenPlaces, setChosenPlaces] = React.useState([]);

  const [places, setPlaces] = React.useState([...props.places]);

  const [position, setPosition] = React.useState({ lat: 0, lng: 0 });

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const draggPlace = React.useCallback(
    (oldIndex, newIndex) => {
      setChosenPlaces(setIndexes(arrayMove(chosenPlaces, oldIndex, newIndex)));
    },
    [chosenPlaces]
  );

  const removeChosenPlace = React.useCallback(
    (index) => {
      chosenPlaces[index].isChosen = false;
      const cPlaces = setIndexes(
        typeof index !== "undefined"
          ? arrayRemove(chosenPlaces, index)
          : chosenPlaces
      );

      setChosenPlaces(cPlaces);
    },
    [chosenPlaces]
  );

  const getMarkers = React.useCallback(() => {
    let markers = [];
    if (places.length !== 0) {
      places.forEach((p, indexPlaces) => {
        p.forEach((place, indexPlace) => {
          markers.push(
            <Marker
              key={place.id}
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
                }) ||
                undefined
              }
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              title={place.name}
              icon={
                (!(place.isChosen !== undefined ? place.isChosen : false) && {
                  url: place.icon,
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
  }, [places]);

  React.useEffect(() => {
    // const arrPlaces = [...places];
    // arrPlaces.forEach((p) => {
    //   p.forEach((place) => {
    //     place.isSelected = false;
    //   });
    // });
    // setPlaces(arrPlaces);
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const getInfoWindows = () => {
    let arrInfoWindows = [];
    places.forEach((p, indexPlaces) => {
      p.forEach((place, indexPlace) => {
        arrInfoWindows.push(
          (place.isSelected !== undefined ? place.isSelected : false) && (
            <InfoWindow
              key={place.id}
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
                <span>{place.name}</span>
                <br />
                <span>{place.vicinity}</span>
                <br />
                <br />
                {(!(place.isChosen !== undefined ? place.isChosen : false) && (
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
                      arrChosenPlaces.push(arrPlaces[indexPlaces][indexPlace]);
                      setChosenPlaces(arrChosenPlaces);
                      setPlaces(arrPlaces);
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
                    class="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
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
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          style={{ position: "absolute", zIndex: 1 }}
          className="m-2"
        >
          Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="m-2">
            <form>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="car"
                    name="transport"
                    className="mr-2"
                  />
                  Car
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="bicycle"
                    name="transport"
                    className="mr-2"
                  />
                  Bicycle
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="walk"
                    name="transport"
                    className="mr-2"
                  />
                  Walk
                </label>
              </div>
              <label className="border-top pt-2">
                <input
                  type="number"
                  step={0.5}
                  name="hours"
                  min="0"
                  max="10"
                  className="w-25 mr-2"
                />
                Hours of the trip
              </label>
            </form>
            <Removable
              list={chosenPlaces}
              dragg={draggPlace}
              removeItem={removeChosenPlace}
            ></Removable>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <GoogleMap
        options={options}
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={16}
        onMapLoad={onMapLoad}
      >
        {getMarkers()}
        {getInfoWindows()}
      </GoogleMap>
    </React.Fragment>
  );
}
