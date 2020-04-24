//nearby Search request
import {
  googleKey,
  nearBySearchUrl,
  textSearchUrl,
  radius,
} from "../../config.json";
import http from "./httpRequest";
import Logger from "../loggerServices";

export const getPlaces = function (places) {
  const types = Object.keys(places);
  const respones = [];
  const request = {};

  types.forEach((type) => {
    request["type"] = type;
    request["keyword"] = places[type].toString();
    request["location"] = "32.3071532,34.8830647";
    request["radius"] = radius;
    request["key"] = googleKey;
    getNearbyPlaces(request);
  });
  //return respones
};
export const getLocation = function () {
  let location = {};
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition((position) => {
      location["latitude"] = position.coords.latitude;
      location["longitude"] = position.coords.longitude;
    });
  else alert("Geolocation is not supported by this browser.");
  return location;
};

const getNearbyPlaces = async (request) => {
  try {
    console.log(request);
    const list_of_places = await http.get(
      "https://cors-anywhere.herokuapp.com/" + nearBySearchUrl,
      {
        params: request,
      }
    );
    // if (pagetoken) {
    //   const next_page_request = getNearbyPlaces(
    //     location,
    //     radius,
    //     type,
    //     keyword,
    //     pagetoken
    //   );
    //   list_of_places = { ...list_of_places, ...next_page_request };
    // }
    console.log(list_of_places.data);
    // return list_of_places;
  } catch (err) {
    Logger.log(err);
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
