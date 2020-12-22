import React from "react";


//Admin buttons list
const AdminButtons = (props) => {
  return (
    <div className="list-group">     
      {props.data.map((name, index)=>{
        return (
            <button
              onClick={()=>{props.handleClick(index)}}
              className={`list-group-item list-group-item-action text-center ${
               ((props.selected === index) && "active") || ""
      }`}
              key={index}
    >
      {name}
    </button>
    );
  })}
    </div>
  );
};

export default AdminButtons;
