import React, { Component } from "react";
import Category from "./category";
import SubCategory from "./subCategory";

class Quest extends Component {
  categoryList = ["Restaurants", "Bars", "Museums"];
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
      <div className="row">
        <div className="col-sm-2">
          <Category
            handleOnClickCategory={this.handleOnClickCategory}
            categoryList={this.categoryList}
            selectedCategory={this.state.selectedCategory}
          />
        </div>
        <div className="col">
          <SubCategory></SubCategory>
        </div>
      </div>
    );
  }
}

export default Quest;
