import React, { Component } from "react";
import { getAllMainCategories } from "../../services/Categories";
import Category from "./category";
import { getSubCategoriesId } from "../../services/CategSubCateg";
import SubCategory from "./subCategory";
import { getPlaces } from "./../../Utils/httpRequest/GoogleRequest";

class Quest extends Component {
  state = {
    categoryList: [],
    columnsInSubCategoires: 3,
    columnsOfSubcategories: 2,
    isLoading: false,
  };

  getPlaces = async () => {
    this.setState({ isLoading: true });
    const places = {};
    const categories = this.state.categoryList;
    categories.forEach((category) => {
      if (category.isCurrentlySelected) {
        const subCategory = [];
        category.subCategory.forEach((sub) => {
          if (sub.isSelected) subCategory.push(sub.name);
        });
        places[category.name] = subCategory;
      }
    });
    let respones = await getPlaces(places);
    this.props.history.push({
      pathname: "/",
      state: { respones },
    });
  };

  handleGetCategories = async () => {
    const categories = await getAllMainCategories();
    categories.forEach((category) => {
      category.isFirstSelected = false;
      category.isCurrentlySelected = false;
    });
    this.setState({ categoryList: categories });
  };

  handleOnClickCategory = async (button, key) => {
    const categories = [...this.state.categoryList];
    const category = categories.find((category) => {
      return category.id === key;
    });
    if (!category.isFirstSelected) {
      category.isFirstSelected = true;
      category.isCurrentlySelected = true;
      category.subCategory = await this.handleGetSubCategories(key);
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
    console.log(categories);
    this.setState({ categoryList: categories });
  }; //need to optimise and factorise

  handleOnClickSubCategory = (keyCategory, keySubCategory) => {
    const categoryList = [...this.state.categoryList];

    const indexCategory = categoryList.findIndex(
      (category) => category.id === keyCategory
    );
    const indexSubCategory = categoryList[indexCategory].subCategory.findIndex(
      (subCategory) => subCategory.sub_id === keySubCategory
    ); //O(n) can improve to O(1)
    const flag =
      categoryList[indexCategory].subCategory[indexSubCategory].isSelected;
    categoryList[indexCategory].subCategory[
      indexSubCategory
    ].isSelected = !flag;
    this.setState({ categoryList });
  }; //neeed to optimise

  handleGetSubCategories = async (id) => {
    const subCategory = await getSubCategoriesId(id);
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
      <React.Fragment>
        <div className="float-left">
          <Category
            handleOnClickCategory={this.handleOnClickCategory}
            categoryList={this.state.categoryList}
          />
          <div className="text-center p-3">
            {(!this.state.isLoading && (
              <button
                onClick={this.getPlaces}
                hidden={
                  !this.state.categoryList.some(
                    (category) => category.isCurrentlySelected
                  )
                }
                type="button"
                className="btn btn-primary btn-md"
              >
                Next
              </button>
            )) || (
              <button class="btn btn-primary btn-md" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            )}
          </div>
        </div>
        <div className="container">{this.handleDivideSubCategories()}</div>
      </React.Fragment>
    );
  }
}

export default Quest;
