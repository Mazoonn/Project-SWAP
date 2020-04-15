import React, { Component } from "react";
import { getCategories } from "../../services/Categories";
import Category from "./category";
import SubCategory from "./subCategory";
import { getSubCategoriesId } from "../../services/CategSubCateg";

class Quest extends Component {
  state = { categoryList: [], rowsInSubCategoires: 3 };

  handleGetCategories = () => {
    const categories = getCategories();
    categories.forEach((category) => {
      category.isFirstSelected = false;
      category.isCurrentlySelected = false;
    });
    this.setState({ categoryList: categories });
  };

  handleOnClickCategory = (button, key) => {
    const categories = [...this.state.categoryList];
    const category = categories.find((category) => {
      return category.id === key;
    });
    if (!category.isFirstSelected) {
      category.isFirstSelected = true;
      category.isCurrentlySelected = true;
      category.subCategory = getSubCategoriesId(key);
      button.className = button.className + " active";
    } else {
      if (category.isCurrentlySelected)
        button.className = button.className.replace("active", "");
      else button.className = button.className + " active";
      category.isCurrentlySelected = !category.isCurrentlySelected;
    }
    categories.forEach((cat) => {
      if (cat.id === button.key) cat = category;
    });
    this.setState({ categoryList: categories });
  }; //need to optimise and factorise

  componentDidMount() {
    this.handleGetCategories();
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-2">
          <Category
            handleOnClickCategory={this.handleOnClickCategory}
            categoryList={this.state.categoryList}
          />
        </div>
        <div className="col-sm-2">
          <SubCategory rows={this.state.rowsInSubCategoires}></SubCategory>
        </div>
      </div>
    );
  }
}

export default Quest;
