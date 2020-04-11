import React, { Component } from "react";

class Category extends Component {
  categoryList = ["Restaurants", "Bars"];
  state = { selectedCategory: [] };

  handleClick = (button) => {
    let selectedCategory = [...this.state.selectedCategory];
    let className = button.className;
    const name = button.name;
    const select = button.selected;

    if (!select) {
      selectedCategory.push(name);
      button.className = className + " active";
    } else {
      selectedCategory = selectedCategory.filter((value) => value !== name);
      button.className = className.replace("active", "");
    }

    button.selected = !select;
    this.setState({ selectedCategory });
  };

  render() {
    return (
      <div className="list-group">
        {this.categoryList.map((category) => {
          return (
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={(button) => {
                this.handleClick(button.target);
              }}
              selected={false}
              name={category}
            >
              {category}
            </button>
          );
        })}
        <button
          disabled={this.state.selectedCategory.length === 0 ? true : false}
        >
          Next
        </button>
      </div>
    );
  }
}
export default Category;
