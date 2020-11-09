import React from "react";
import { Business_button_types } from "../../models/Business";
const BusinessButtons = (props) => {
  return (
    <div className="list-group">
      <button
        onClick={props.handleOnSelectButton}
        id="products"
        value={0}
        className={`list-group-item list-group-item-action text-center ${(props.isProducts && "active") || ""}`}
      >
        Products
      </button>
      <button
        onClick={props.handleOnSelectButton}
        id="list of business"
        value={1}
        className={`list-group-item list-group-item-action text-center ${(props.isListOfBusiness && "active") || ""}`}
      >
        List of business
      </button>
      <button
        onClick={props.handleOnSelectButton}
        id="add business"
        value={2}
        className={`list-group-item list-group-item-action text-center ${(props.isAddBusiness && "active") || ""}`}
      >
        Add business
      </button>
    </div>
  );
};

export default BusinessButtons;
