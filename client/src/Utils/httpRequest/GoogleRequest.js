//nearby Search request
import { googleKey, nearBySearchUrl, textSearchUrl } from "../../config.json";
import http from "./httpRequest";
import Logger from "../loggerServices";

export const getNearbyPlaces = async (
  location,
  radius,
  type,
  keyword,
  pagetoken = null
) => {
  try {
    const list_of_places = await http.get(
      `${nearBySearchUrl}?location=${location}&radius=${radius}&key=${googleKey}&${
        pagetoken == null ? "" : `pagetoken=${pagetoken}`
      }&keyword=${keyword}&type=${type}`
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
    return list_of_places;
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
