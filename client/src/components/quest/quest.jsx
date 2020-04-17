import React, { Component } from "react";
import { getCategories } from "../../services/Categories";
import Category from "./category";
import { getSubCategoriesId } from "../../services/CategSubCateg";
import SubCategory from "./subCategory";

class Quest extends Component {
  state = {
    categoryList: [],
    columnsInSubCategoires: 3,
    columnsOfSubcategories: 4,
  };

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
      category.subCategory = this.handleGetSubCategories(key);
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

  handleOnClickSubCategory = (keyCategory, keySubCategory) => {
    const categoryList = [...this.state.categoryList];
    const indexCategory = categoryList.findIndex(
      (category) => category.id === keyCategory
    );
    const indexSubCategory = categoryList[indexCategory].subCategory.findIndex(
      (subCategory) => subCategory.id2 === keySubCategory
    ); //O(n^2) can improve to O(1)
    const flag =
      categoryList[indexCategory].subCategory[indexSubCategory].isSelected;
    categoryList[indexCategory].subCategory[
      indexSubCategory
    ].isSelected = !flag;
    this.setState({ categoryList });
  }; //neeed to optimise

  handleGetSubCategories = (id) => {
    const subCategory = getSubCategoriesId(id);
    subCategory.forEach((category) => {
      category.isSelected = false;
    });
    return subCategory;
  };

  handleDivideSubCategories = () => {
    const rows = [];
    const categories = this.state.categoryList.filter(
      (category) => category.isCurrentlySelected
    );
    const size = Math.ceil(
      categories.length / this.state.columnsOfSubcategories
    );
    for (var i = 0; i < size; i++) {
      let slice = categories.slice(
        i * this.state.columnsOfSubcategories,
        (i + 1) * this.state.columnsOfSubcategories
      );
      rows[i] = (
        <div className="row">
          {slice.map((category) => {
            return (
              <div className="col">
                <SubCategory
                  category={category}
                  columns={this.state.columnsInSubCategoires}
                  clickSubCategory={this.handleOnClickSubCategory}
                ></SubCategory>
              </div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

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
        {this.handleDivideSubCategories()}
      </div>
    );
  }
}

export default Quest;
