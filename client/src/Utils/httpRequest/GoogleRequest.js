//nearby Search request
import { googleKey, nearBySearchUrl, textSearchUrl, radius } from "../../config.json";
import http from "./httpRequest";
import Logger from "../loggerServices";

export const getPlaces = async function (places, location, openNow) {
  const requests = [];
  const ids = [];
  const service = new window.google.maps.places.PlacesService(document.createElement("div"));

  for (const place of places) {
    const idObject = {};
    const request = {};
    idObject["main_id"] = place.main_id;
    idObject["sub_id"] = place.sub_id;
    ids.push(idObject);
    request["type"] = place.main_value;
    request["keyword"] = place.sub_value;
    request["location"] = { lat: location.latitude, lng: location.longitude };
    request["radius"] = radius;
    request["openNow"] = openNow;
    requests.push(request);
  }

    const results = await Promise.all(requests.map((request, index) => 
      {
        return new Promise(
        function(resolve)
        {
          service.nearbySearch(request, function(googleResults, status) 
          {
            if (status === google.maps.places.PlacesServiceStatus.OK) 
            {
              googleResults.forEach(place => {delete place["opening_hours"]; delete place["permanently_closed"];});
              resolve(({places: googleResults, ids: ids[index] }));
            }
            if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) 
            {
              resolve(({places: [], ids: [] }));
            }
          });
        });
    }));

  return results;
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
    Logger.error(error);
  }
};

const getNearbyPlaces = async (request) => {
  try {
    const list_of_places = await http.get("https://cors-anywhere.herokuapp.com/" + nearBySearchUrl, {
      params: request,
    });
    return list_of_places.data.results;
  } catch (err) {
    Logger.log(err);
  }
};

export const getTextSearch = async (query) => {
  try {
    if (!query) {
      throw Error("Did Not enter a text to search");
    }
    const list_of_places = await http.get(`${textSearchUrl}?query=${query}&key=${googleKey}`);
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
