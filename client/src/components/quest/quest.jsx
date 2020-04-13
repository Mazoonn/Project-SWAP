import React, { Component } from "react";
import Category from "./category";

class Quest extends Component {
  categoryList = ["Restaurants", "Bars"];
  state = { selectedCategory: [] };

  handleOnClickCategory = (button) => {
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
      <React.Fragment>
        <Category
          handleOnClickCategory={this.handleOnClickCategory}
          categoryList={this.categoryList}
          selectedCategory={this.state.selectedCategory}
        />
      </React.Fragment>
    );
  }
}

export default Quest;
