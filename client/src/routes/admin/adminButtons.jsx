import React from "react";

const AdminButtons = (props) => {
  return (
    <div className="list-group">
      <button
        onClick={props.handleClickCategories}
        className={`list-group-item list-group-item-action text-center ${
          (props.isCategories && "active") || ""
        }`}
      >
        Categories
      </button>

      <button
        onClick={props.handleClickSubCategories}
        className={`list-group-item list-group-item-action text-center ${
          (props.isSubCategories && "active") || ""
        }`}
      >
        Sub Categories
      </button>
    </div>
  );
};

export default AdminButtons;
