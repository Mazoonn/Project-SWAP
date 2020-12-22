import React from "react";

//Business list of buttons
const BusinessButtons = (props) => {
  return (
    <div className="list-group">
      {props.data.map((name, index) => {
        return (
          <button
            onClick={() => {
              props.handleClick(index);
            }}
            className={`list-group-item list-group-item-action text-center ${(props.selected === index && "active") || ""}`}
            key={index}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default BusinessButtons;
