import React, { useEffect, useRef } from "react";

let autoComplete;

function handleScriptLoad(updateAddress, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["geocode"] }
  );
  autoComplete.setFields(["address_components", "place_id", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateAddress)
  );
}

async function handlePlaceSelect(updateAddress) {
  const addressObject = autoComplete.getPlace();
  updateAddress(addressObject);
}

function SearchLocationInput({ setAddress }) 
{
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    handleScriptLoad(setAddress, autoCompleteRef);
  }, []);

  return (
    <div className="search-location-input">
      <input
        className="form-control"
        ref={autoCompleteRef}
        placeholder="Enter Address"
      />
    </div>
  );
}

export default SearchLocationInput;
