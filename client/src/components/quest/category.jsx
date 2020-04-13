import React, { Component } from "react";

class Category extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.categoryList.map((category) => {
          return (
            <button
              type="button"
              className="list-group-item list-group-item-action"
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
        <button
          disabled={this.props.selectedCategory.length === 0 ? true : false}
        >
          Next
        </button>
      </div>
    );
  }
}
export default Category;
