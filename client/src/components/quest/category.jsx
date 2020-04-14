import React, { Component } from "react";

class Category extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.categoryList.map((category) => {
          return (
            <button
              type="button"
              className="list-group-item list-group-item-action text-center"
              onClick={(button) => {
                this.props.handleOnClickCategory(button.target);
              }}
              selected={false}
              name={category}
            >
              {category}
            </button>
          );
        })}
      </div>
    );
  }
}
export default Category;
