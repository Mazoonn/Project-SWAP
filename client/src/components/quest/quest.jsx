import React, { Component } from "react";
import { getCategories } from "../../services/Categories";
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

  handleGetCategories = () => {
    const categories = getCategories();
    categories.forEach((category) => {
      category.isFirstSelected = false;
      category.isCurrentlySelected = false;
    });
    this.setState({ categoryList: categories });
  };

  handleOnClickCategory = (key) => {
    const categories = [...this.state.categoryList];
    const indexCategories = categories.findIndex(
      (category) => category.id === key
    );
    if (!categories[indexCategories].isFirstSelected) {
      categories[indexCategories].isFirstSelected = true;
      categories[indexCategories].isCurrentlySelected = true;
      categories[indexCategories].subCategory = this.handleGetSubCategories(
        key
      );
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
      (subCategory) => subCategory.id2 === keySubCategory
    ); //O(n) can improve to O(1)
    const flag =
      categoryList[indexCategory].subCategory[indexSubCategory].isSelected;
    categoryList[indexCategory].subCategory[
      indexSubCategory
    ].isSelected = !flag;
    this.setState({ categoryList });
  };

  handleGetSubCategories = (id) => {
    const subCategory = getSubCategoriesId(id);
    subCategory.forEach((category) => {
      category.isSelected = false;
    });
    return subCategory;
  };

  handleDivideSubCategories = () => {
    // const rows = [];
    const categories = this.state.categoryList.filter(
      (category) => category.isCurrentlySelected
    );
    // const size = Math.ceil(
    //   categories.length / this.state.columnsOfSubcategories
    // );
    // for (var i = 0; i < size; i++) {
    //   let slice = categories.slice(
    //     i * this.state.columnsOfSubcategories,
    //     (i + 1) * this.state.columnsOfSubcategories
    //   );
    return (
      <div className={`row row-cols-${this.state.columnsOfSubcategories}`}>
        {categories.map((category) => {
          return (
            <div className="col p-4">
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
