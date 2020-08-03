import React, { Component } from "react";
import {
  getAllMainCategoriesAdmin,
  putCategories,
  postSubCategory,
  deleteSubCategory,
  updateSubCategoryOfMainCategory,
} from "../../services/Categories";
import { getSubCategoriesId } from "../../services/CategSubCateg";
import AdminCategories from "./adminCategories";
import AdminButtons from "./adminButtons";

class AdminPage extends Component {
  state = {
    categories: [],
    subCategories: [],
    isCategories: false,
    isSubCategories: false,
    isDefault: true,
    loading: false,
  };

  handleClickSubCategories = () => {
    let isSubCategories = !this.state.isSubCategories;
    if (isSubCategories) {
      this.setState({ isCategories: false });
      this.handleGetCategories();
    }

    this.setState({ isSubCategories });
  };

  handleClickCategories = () => {
    let isCategories = !this.state.isCategories;
    if (isCategories) {
      this.setState({ isSubCategories: false, isDefault: true });
      this.handleGetCategories();
    }

    this.setState({ isCategories });
  };

  handleGetCategories = async () => {
    const categories = await getAllMainCategoriesAdmin();
    this.setState({
      categories,
    });
  };

  handleOnChangeIsActive = (index) => {
    const categories = [...this.state.categories];
    const category = categories[index];
    category.is_active = !category.is_active;
    category.is_change =
      category.is_change === undefined ? true : !category.is_change;
    this.setState({ categories });
  };

  handlePutCategories = async () => {
    this.setState({ loading: true });
    const request = [];
    for (const category of this.state.categories) {
      if (category.is_change) request.push(category);
    }
    await Promise.all(
      request.map((category) => {
        return putCategories(category.id, category.is_active);
      })
    );
    const categories = [...this.state.categories];
    categories.forEach((category) => {
      category.is_change = false;
    });
    this.setState({ categories, loading: false });
  };

  AreChanges = () => {
    let result = false;
    result = this.state.categories.some((category) =>
      category.is_change === undefined ? false : category.is_change
    );
    return result;
  };

  handleOnChangeSelect = async (event) => {
    const index = event.target.value;
    this.setState({ subCategory: undefined });
    if (index !== "default") {
      const category_id = this.state.categories[index].id;
      const subCategories = await getSubCategoriesId(category_id);
      this.addNewValuesToSubCategories(subCategories);
      this.setState({ subCategories, isDefault: false, indexCategory: index });
    } else this.setState({ isDefault: true });
  };

  addNewValuesToSubCategories = (subCategories) => {
    const values = ["descrition", "google_value", "sub_name"];
    subCategories.forEach((subCategory) => {
      !subCategory["descrition"] && (subCategory["descrition"] = "");
      !subCategory["google_value"] && (subCategory["google_value"] = "");

      values.forEach((value) => {
        subCategory[`${value}_new`] = subCategory[value];
      });
    });
  };

  handleOnChangeSubCategory = (event, index) => {
    const value = event.target.value;
    const name = event.target.name;
    if (index !== -1) {
      const subCategories = [...this.state.subCategories];
      const category = subCategories[index];
      category[name] = value;
      subCategories[index] = category;
      this.setState({ subCategories });
    } else {
      const subCategory = { ...this.state.subCategory };
      subCategory[name] = value;
      this.setState({ subCategory });
    }
  };

  isValidSubCategory = () => {
    const { subCategory } = this.state;
    return (
      !subCategory ||
      Object.keys(subCategory).length !== 3 ||
      subCategory["sub_name"] === "" ||
      subCategory["descrition"] === "" ||
      subCategory["google_value"] === ""
    );
  };

  handleAddNewSubCategory = async () => {
    const index = this.state.indexCategory;
    const main_id = this.state.categories[index].id;
    const category = { ...this.state.subCategory };
    this.setState({ subCategory: undefined });
    category.main_id = main_id;
    await postSubCategory(category);

    const subCategories = await getSubCategoriesId(main_id);
    this.addNewValuesToSubCategories(subCategories);
    this.setState({
      subCategories,
    });
  };

  handleDeleteSubCategory = async (indexSubCategory) => {
    const main_id = this.state.categories[this.state.indexCategory].id;
    const sub_id = this.state.subCategories[indexSubCategory].sub_id;
    await deleteSubCategory(main_id, sub_id);
    const subCategories = await getSubCategoriesId(main_id);
    this.addNewValuesToSubCategories(subCategories);
    this.setState({
      subCategories,
    });
  };

  handleOnClickSaveSubCategory = async (index) => {
    const {
      main_id,
      sub_id,
      sub_name_new,
      google_value_new,
      descrition_new,
    } = this.state.subCategories[index];
    const req = {
      main_id,
      sub_id,
      sub_name: sub_name_new,
      descrition: descrition_new,
      google_value: google_value_new,
    };
    await updateSubCategoryOfMainCategory(req);
    const subCategories = await getSubCategoriesId(main_id);
    this.addNewValuesToSubCategories(subCategories);
    this.setState({
      subCategories,
    });
  };

  isSubCategoryChange = (index) => {
    let result = false;
    const subCategory = this.state.subCategories[index];
    const values = ["descrition", "sub_name", "google_value"];
    values.forEach((value) => {
      if (subCategory[value] !== subCategory[`${value}_new`]) result = true;
    });
    return result;
  };

  render() {
    const {
      isCategories,
      loading,
      categories,
      isSubCategories,
      subCategory,
    } = this.state;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <AdminButtons
              handleClickSubCategories={this.handleClickSubCategories}
              handleClickCategories={this.handleClickCategories}
              isCategories={isCategories}
              isSubCategories={isSubCategories}
            />
          </div>
          <div className="col">
            {isSubCategories && (
              <div>
                <h4>Categories</h4>
                <select
                  id="categories"
                  onChange={this.handleOnChangeSelect}
                  className="custom-select mb-4"
                  style={{ width: "200px" }}
                >
                  <option value={"default"} defaultValue>
                    Category...
                  </option>
                  {this.state.categories.map((category, index) => {
                    return (
                      <option key={category.id} value={index}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                {!this.state.isDefault && (
                  <React.Fragment>
                    <h3>Sub Categories</h3>
                    <table className="table table-bordered table-sm mt-4">
                      <thead>
                        <tr>
                          <th colSpan={5} className="text-center">
                            {
                              this.state.categories[this.state.indexCategory]
                                .name
                            }
                          </th>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Google Value</th>
                          <th className="text-center">Save</th>
                          <th className="text-center">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.subCategories.map((subCategory, index) => {
                          return (
                            <tr key={subCategory.sub_id}>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeSubCategory(
                                      event,
                                      index
                                    );
                                  }}
                                  name="sub_name_new"
                                  type="text"
                                  className="form-control"
                                  value={subCategory.sub_name_new}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeSubCategory(
                                      event,
                                      index
                                    );
                                  }}
                                  name="descrition_new"
                                  type="text"
                                  className="form-control"
                                  value={subCategory.descrition_new}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeSubCategory(
                                      event,
                                      index
                                    );
                                  }}
                                  name="google_value_new"
                                  type="text"
                                  className="form-control"
                                  value={subCategory.google_value_new}
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    this.handleOnClickSaveSubCategory(index);
                                  }}
                                  disabled={!this.isSubCategoryChange(index)}
                                >
                                  Save
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  onClick={() => {
                                    this.handleDeleteSubCategory(index);
                                  }}
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td>
                            <input
                              value={
                                (subCategory && subCategory.sub_name) || ""
                              }
                              onChange={(event) => {
                                this.handleOnChangeSubCategory(event, -1);
                              }}
                              name="sub_name"
                              type="text"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              value={
                                (subCategory && subCategory.descrition) || ""
                              }
                              onChange={(event) => {
                                this.handleOnChangeSubCategory(event, -1);
                              }}
                              name="descrition"
                              type="text"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              value={
                                (subCategory && subCategory.google_value) || ""
                              }
                              onChange={(event) => {
                                this.handleOnChangeSubCategory(event, -1);
                              }}
                              name="google_value"
                              type="text"
                              className="form-control"
                            />
                          </td>
                          <td colSpan={2} className="text-center">
                            <button
                              disabled={this.isValidSubCategory()}
                              onClick={this.handleAddNewSubCategory}
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              Add new
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </React.Fragment>
                )}
              </div>
            )}
            <AdminCategories
              AreChanges={this.AreChanges}
              handleOnChangeIsActive={this.handleOnChangeIsActive}
              handlePutCategories={this.handlePutCategories}
              isCategories={isCategories}
              loading={loading}
              categories={categories}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
