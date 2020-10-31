import React from "react";

const BusinessButtons = (props) => {
  return (
    <div className="list-group">
      <button
        // onClick={}
        className={`list-group-item list-group-item-action text-center ${(props.isAddBusiness && "active") || ""}`}
      >
        Add business
      </button>

      <button
        // onClick={}
        className={`list-group-item list-group-item-action text-center ${(props.isListOfBusiness && "active") || ""}`}
      >
        List of business
      </button>
      <button
        //  onClick={}
        className={`list-group-item list-group-item-action text-center ${(props.isProducts && "active") || ""}`}
      >
        Products
      </button>
    </div>
  );
};

export default BusinessButtons;
