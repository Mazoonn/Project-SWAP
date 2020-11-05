import React from "react";
import { Business_button_types } from "../../models/Business";
const BusinessButtons = (props) => {
  return (
    <div className="list-group">
      <button
        onClick={props.handleClickProducts}
        className={`list-group-item list-group-item-action text-center ${(props.isProducts && "active") || ""}`}
      >
        Products
      </button>
      <button
        onClick={props.handleClickListOfBusiness}
        className={`list-group-item list-group-item-action text-center ${(props.isListOfBusiness && "active") || ""}`}
      >
        List of business
      </button>
      <button
        onClick={props.handleClickAddBusiness}
        className={`list-group-item list-group-item-action text-center ${(props.isAddBusiness && "active") || ""}`}
      >
        Add business
      </button>
    </div>
  );
};

export default BusinessButtons;
