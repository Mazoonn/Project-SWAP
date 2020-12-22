import React, { useEffect, useRef } from "react";

//Search location input

let autoComplete;

//When google maps script loaded then create input element with google maps places autocomplete 
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

//Set place address to state
async function handlePlaceSelect(updateAddress) {
  const addressObject = autoComplete.getPlace();
  updateAddress(addressObject);
}

//Input element with google autocomplete
function SearchLocationInput({ setAddress, error, disabled, id, reset }) 
{
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    handleScriptLoad(setAddress, autoCompleteRef);
  }, []);

  if(reset) autoCompleteRef.current.value = "";

  return (
    <div className="search-location-input">
      <input
        id={id}
        disabled = {disabled}
        className="form-control"
        ref={autoCompleteRef}
        placeholder="Enter Address"
      />
    {error && <div className="alert alert-danger" role="alert">
      {error}
    </div>}
    </div>
  );
}

export default SearchLocationInput;
