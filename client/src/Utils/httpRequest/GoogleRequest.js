import { resolve } from "dns";
import {  radius } from "../../config.json";
import Logger from "../loggerServices";
import getAddress from './../../services/Address';

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

export const getPlaceAddress = async function (placeId) {
  const service = new window.google.maps.places.PlacesService(document.createElement("div"));
  const request = 
  {
    placeId,
    fields: ["address_component"] 
  };
  return new Promise((resolve) => 
  {
    service.getDetails(request, function(PlaceResult, PlacesServiceStatus) 
    {
      resolve(getAddress(PlaceResult));
    });
  });
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

