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
    let keysToRemove = ["isFinished", "route", "radioValue", "places"];
    const places = {};
    const categories = this.state.categoryList;
    categories.forEach((category) => {
      if (category.isCurrentlySelected) {
        const subCategory = [];
        category.subCategory.forEach((sub) => {
          if (sub.isSelected) subCategory.push(sub.sub_name);
        });
        places[category.name] = subCategory;
      }
    });
    let respones = await getPlaces(places);
    keysToRemove.forEach((key) => {
      window.localStorage.removeItem(key);
    });
    localStorage.setItem("questPlaces", JSON.stringify(respones));

    this.props.history.push("/");

    // this.props.history.push({
    //   pathname: "/",
    //   state: { respones },
    // });
  };

  handleGetCategories = async () => {
    try {
      const categories = await getAllMainCategories();
      categories.forEach((category) => {
        category.isFirstSelected = false;
        category.isCurrentlySelected = false;
      });
      this.setState({ categoryList: categories });
    } catch (e) {
      console.log(e);
    }
  };
  handleOnClickCategory = async (key) => {
    const categories = [...this.state.categoryList];
    const indexCategories = categories.findIndex(
      (category) => category.id === key
    );
    if (!categories[indexCategories].isFirstSelected) {
      categories[indexCategories].isFirstSelected = true;
      categories[indexCategories].isCurrentlySelected = true;
      categories[
        indexCategories
      ].subCategory = await this.handleGetSubCategories(key);
    } else
      categories[indexCategories].isCurrentlySelected = !categories[
        indexCategories
      ].isCurrentlySelected;
    this.setState({ categoryList: categories });
  };

  handleOnClickSubCategory = (keyCategory, keySubCategory) => {
    const categoryList = [...this.state.categoryList];

    const indexCategory = categoryList.findIndex(
      (category) => category.id === keyCategory
    );
    const indexSubCategory = categoryList[indexCategory].subCategory.findIndex(
      (subCategory) => subCategory.sub_id === keySubCategory
    );
    const flag =
      categoryList[indexCategory].subCategory[indexSubCategory].isSelected;
    categoryList[indexCategory].subCategory[
      indexSubCategory
    ].isSelected = !flag;
    this.setState({ categoryList });
  };

  handleGetSubCategories = async (id) => {
    const subCategory = await getSubCategoriesId(id);
    subCategory.forEach((category) => {
      category.isSelected = false;
    });
    return subCategory;
  };

  handleDivideSubCategories = () => {
    const categories = this.state.categoryList.filter(
      (category) => category.isCurrentlySelected
    );
    return (
      <div className={`row row-cols-${this.state.columnsOfSubcategories}`}>
        {categories.map((category) => {
          return (
            <SubCategory
              key={category.id}
              isLoading={this.state.isLoading}
              category={category}
              columns={this.state.columnsInSubCategoires}
              clickSubCategory={this.handleOnClickSubCategory}
            ></SubCategory>
          );
        })}
      </div>
    );
  };

  componentDidMount() {
    this.handleGetCategories();
  }
  render() {
    return (
      <React.Fragment>
        <div className="float-left">
          <Category
            isLoading={this.state.isLoading}
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
              <button className="btn btn-primary btn-md" type="button" disabled>
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
