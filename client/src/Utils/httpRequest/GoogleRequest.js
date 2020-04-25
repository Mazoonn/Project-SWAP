//nearby Search request
import {
  googleKey,
  nearBySearchUrl,
  textSearchUrl,
  radius,
} from "../../config.json";
import http from "./httpRequest";
import Logger from "../loggerServices";

let googleMaps;

export const getPlaces = function (places) {
  const types = Object.keys(places);
  const location = JSON.stringify(getLocation());
  const requests = [];

  for (const type of types) {
    const request = {};
    request["type"] = type;
    request["keyword"] = places[type].toString();
    request["location"] = location;
    request["radius"] = radius;
    request["key"] = googleKey;
    requests.push(request);
  }
  return Promise.all(requests.map((request) => getNearbyPlaces(request)));
};

export const getLocation = function () {
  const location = {};
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition((position) => {
      location["latitude"] = position.coords.latitude;
      location["longitude"] = position.coords.longitude;
    });
  else alert("Geolocation is not supported by this browser.");
  return location;
};

export const googleObjects = (map, maps) => {
  googleMaps = maps;
};

const getNearbyPlaces = async (request) => {
  try {
    const list_of_places = await http.get(
      "https://cors-anywhere.herokuapp.com/" + nearBySearchUrl,
      {
        params: request,
      }
    );
    return list_of_places.data.results;
    // return list_of_places;
  } catch (err) {
    console.log(err);
  }
};

export const getTextSearch = async (query) => {
  try {
    if (!query) {
      throw Error("Did Not enter a text to search");
    }
    const list_of_places = await http.get(
      `${textSearchUrl}?query=${query}&key=${googleKey}`
    );
    // if (list_of_places.next_page_token) {
    //   const next_page_request = getTextSearch(list_of_places.next_page_token);
    //   list_of_places = { ...list_of_places, ...next_page_request };
    // }
    //filtering the results
    return list_of_places;
  } catch (err) {
    Logger.log(err);
  }
};
