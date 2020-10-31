import React, { Component } from "react";
import BusinessButtons from "./businessButtons";

class BusinessPage extends Component {
  state = {
    business: [],
    products: [],
    business_owner_id: "",
    isAddBusiness: false,
    isListOfBusiness: false,
    isProducts: false,
    isDefault: true,
    loading: false,
  };

  render() {
    const { isAddBusiness, loading, business, isProducts, isListOfBusiness, subCategory } = this.state;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <BusinessButtons isAddBusiness={isAddBusiness} isProducts={isProducts} isListOfBusiness={isListOfBusiness} />
          </div>
          <div className="col">
            {isListOfBusiness && (
              <div>
                <h4>Categories</h4>
                <select
                  id="business"
                  onChange={this.handleOnChangeSelect}
                  className="custom-select mb-4"
                  style={{ width: "200px" }}
                >
                  <option value={"default"} defaultValue>
                    Category...
                  </option>
                  {this.state.business.map((category, index) => {
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
                            {/* {this.state.business[this.state.indexCategory].name} */}
                          </th>
                        </tr>
                        <tr>
                          {/* <th>Name</th>
                          <th>Description</th>
                          <th>Google Value</th>
                          <th className="text-center">Save</th>
                          <th className="text-center">Delete</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {this.state.subCategories.map((subCategory, index) => {
                          return (
                            <tr key={subCategory.sub_id}>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeSubCategory(event, index);
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
                                    this.handleOnChangeSubCategory(event, index);
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
                                    this.handleOnChangeSubCategory(event, index);
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
                              value={(subCategory && subCategory.sub_name) || ""}
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
                              value={(subCategory && subCategory.descrition) || ""}
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
                              value={(subCategory && subCategory.google_value) || ""}
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
                        </tr> */}
                      </tbody>
                    </table>
                  </React.Fragment>
                )}
              </div>
            )}
            {/* <AdminCategories
              AreChanges={this.AreChanges}
              handleOnChangeIsActive={this.handleOnChangeIsActive}
              handlePutCategories={this.handlePutCategories}
              isAddBusiness={isAddBusiness}
              loading={loading}
              business={business}
            /> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessPage;
