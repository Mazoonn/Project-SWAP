//nearby Search request
import { googleKey } from "../../config.json";
const axios = require("axios").default;

export const getNearbyPlaces = () => {
  axios
    .get("/user", {
      params: {
        ID: 12345,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};
