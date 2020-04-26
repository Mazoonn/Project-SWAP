//nearby Search request
import {
  googleKey,
  nearBySearchUrl,
  textSearchUrl,
  radius,
} from "../../config.json";
import http from "./httpRequest";
import Logger from "../loggerServices";

export const getPlaces = async function (places) {
  const types = Object.keys(places);
  const location = await fetchCoordinates();
  const requests = [];

  for (const type of types) {
    const request = {};
    request["type"] = type;
    request["keyword"] = places[type].toString();
    request["location"] = `${location.latitude},${location.longitude}`;
    request["radius"] = radius;
    request["key"] = googleKey;
    requests.push(request);
  }
  return Promise.all(requests.map((request) => getNearbyPlaces(request)));
};

function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
export const fetchCoordinates = async () => {
  try {
    const { coords } = await getCurrentPosition();
    return coords;

    // Handle coordinates
  } catch (error) {
    // Handle error
    console.error(error);
  }
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
