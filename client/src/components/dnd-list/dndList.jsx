import React from "react";
import { List } from "react-movable";

const RemovableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#555"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x-circle"
  >
    <title>Remove</title>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const buttonStyles = {
  border: "none",
  margin: 0,
  padding: 0,
  width: "auto",
  overflow: "visible",
  cursor: "pointer",
  background: "transparent",
};

export default function Removable(props) {
  const items = [...props.list];
  const removeFunction = props.removeItem;

  return (
    <div>
      {items.length !== 0 && (
        <div className="border-top pt-2">
          <List
            values={items}
            onChange={({ oldIndex, newIndex }) => {
              props.dragg(oldIndex, newIndex);
            }}
            renderList={({ children, props, isDragged }) => (
              <ul
                {...props}
                style={{
                  cursor: isDragged ? "grabbing" : "inherit",
                  zIndex: 1000,
                }}
                className="list-group"
              >
                {children}
              </ul>
            )}
            renderItem={({ value, props, index, isDragged, isSelected }) => (
              <li
                {...props}
                style={{
                  ...props.style,
                  cursor: isDragged ? "grabbing" : "grab",
                  backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
                  zIndex: 1000,
                }}
                className="list-group-item"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{(index + 1).toString() + " " + value.name}</div>{" "}
                  <button
                    onClick={() => {
                      removeFunction(index);
                    }}
                    style={buttonStyles}
                    className="ml-2"
                  >
                    <RemovableIcon />
                  </button>
                </div>
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}
