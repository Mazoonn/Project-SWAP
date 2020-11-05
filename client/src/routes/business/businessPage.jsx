import React, { Component } from "react";
import BusinessButtons from "./businessButtons";
import BusinessCategories from "./BusinessCategories";
import { getAllBusiness, changeActiveBusiness } from "../../services/Business";
import { GetAllProduct } from "../../services/Products";

class BusinessPage extends Component {
  state = {
    business: [],
    products: [],
    index_business_id: "",
    //TODO get the id from the login
    business_owner_id: "client_M8PSxa14IZo6T",
    isAddBusiness: false,
    isListOfBusiness: false,
    isProducts: false,
    isDefault: true,
    loading: false,
  };

  handleClickAddBusiness = async () => {
    let isAddBusiness = !this.state.isAddBusiness;
    if (isAddBusiness) {
      this.setState({ isAddBusiness: false });
      await this.handleGetBusiness();
    }
    this.setState({ isAddBusiness });
  };

  handleClickListOfBusiness = async () => {
    let isListOfBusiness = !this.state.isListOfBusiness;
    if (isListOfBusiness) {
      this.setState({ isListOfBusiness: false, isDefault: true });
      await this.handleGetBusiness();
    }
    this.setState({ isListOfBusiness });
  };

  handleClickProducts = () => {
    let isProducts = !this.state.isProducts;
    if (isProducts) {
      this.setState({ isProducts: false });
      //get list of prodects by business
    }
    this.setState({ isProducts });
  };

  handleOnChangeIsActive = (index) => {
    const businesses = [...this.state.business];
    const business = businesses[index];
    business.is_active = !business.is_active;
    business.is_change = business.is_change === undefined ? true : !business.is_change;
    this.setState({ businesses });
  };

  handleGetBusiness = async () => {
    const business = await getAllBusiness(this.state.business_owner_id);
    this.setState({
      business,
    });
  };

  AreChanges = () => {
    let result = false;
    result = this.state.business.some((business) => (business.is_change === undefined ? false : business.is_change));
    return result;
  };

  changeActiveBusiness = async () => {
    this.setState({ loading: true });
    const request = [];
    for (const business of this.state.business) {
      if (business.is_change) request.push(business);
    }
    await Promise.all(
      request.map((business) => {
        return changeActiveBusiness({ place_id: business.place_id, is_active: business.is_active });
      })
    );
    const business = [...this.state.business];
    business.forEach((business) => {
      business.is_change = false;
    });
    this.setState({ business, loading: false });
  };

  handleOnChangeSelect = async (event) => {
    const index = event.target.value;
    // this.setState({ business: undefined });
    if (index !== "default") {
      const business_selected_id = this.state.business[index].place_id;
      const products = await GetAllProduct(business_selected_id);
      this.addNewValuesToProducts(products);
      this.setState({ products, isDefault: false, index_business_id: index });
    } else this.setState({ isDefault: true }); // TODO check this products: []
  };

  addNewValuesToProducts = (Products) => {
    const values = [
      "name",
      "description",
      "price",
      "creation_date",
      "discount",
      "discount_start_date",
      "discount_end_date",
      "is_active",
    ];
    Products.forEach((Products) => {
      !Products["name"] && (Products["name"] = "");
      !Products["descrition"] && (Products["descrition"] = "");
      !Products["price"] && (Products["price"] = "");
      !Products["creation_date"] && (Products["creation_date"] = "");
      !Products["discount"] && (Products["discount"] = "");
      !Products["discount_start_date"] && (Products["discount_start_date"] = "");
      !Products["discount_end_date"] && (Products["discount_end_date"] = "");
      !Products["is_active"] && (Products["is_active"] = "");

      values.forEach((value) => {
        Products[`${value}_new`] = Products[value];
      });
    });
  };

  handleOnChangeProduct = (event, index) => {
    const value = event.target.value;
    const name = event.target.name;
    if (index !== -1) {
      const products = [...this.state.products];
      const products_to_change = products[index];
      products_to_change[name] = value;
      products[index] = products_to_change;
      this.setState({ products });
    } else {
      const products = { ...this.state.products };
      products[name] = value;
      this.setState({ products });
    }
  };

  render() {
    const { isAddBusiness, loading, business, isProducts, isListOfBusiness, products } = this.state;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <BusinessButtons
              handleClickAddBusiness={this.handleClickAddBusiness}
              handleClickListOfBusiness={this.handleClickListOfBusiness}
              handleClickProducts={this.handleClickProducts}
              isAddBusiness={isAddBusiness}
              isProducts={isProducts}
              isListOfBusiness={isListOfBusiness}
            />
          </div>
          <div className="col">
            {isProducts && (
              <div>
                <h4>Choose A Business</h4>
                <select
                  id="business"
                  onChange={this.handleOnChangeSelect}
                  className="custom-select mb-4"
                  style={{ width: "200px" }}
                >
                  <option value={"default"} defaultValue>
                    Business...
                  </option>
                  {this.state.business.map((business, index) => {
                    return (
                      <option key={business.place_id} value={index}>
                        {business.name}
                      </option>
                    );
                  })}
                </select>
                {!this.state.isDefault && (
                  <React.Fragment>
                    <h3>Products</h3>
                    <table className="table table-bordered table-sm mt-4">
                      <thead>
                        <tr>
                          <th colSpan={9} className="text-center">
                            {this.state.business[this.state.index_business_id].name}
                          </th>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Discount Start Date</th>
                          <th>Discount End Date</th>
                          <th>Active</th>
                          <th className="text-center">Save</th>
                          <th className="text-center">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.products.map((products, index) => {
                          return (
                            <tr key={products.sub_id}>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.ProductsHandleOnChangeProduct(event, index);
                                  }}
                                  name="products_name_new"
                                  type="text"
                                  className="form-control"
                                  value={products.products_name_new}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.ProductsHandleOnChangeProduct(event, index);
                                  }}
                                  name="descrition_new"
                                  type="text"
                                  className="form-control"
                                  value={products.descrition_new}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.ProductsHandleOnChangeProduct(event, index);
                                  }}
                                  name="google_value_new"
                                  type="text"
                                  className="form-control"
                                  value={products.google_value_new}
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    // this.handleOnClickSaveSubbusiness(index);
                                  }}
                                  // disabled={!this.isSubbusinessChange(index)}
                                >
                                  Save
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  onClick={() => {
                                    // this.handleDeleteSubbusiness(index);
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
                              value={(products && products.sub_name) || ""}
                              onChange={(event) => {
                                this.ProductsHandleOnChangeProduct(event, -1);
                              }}
                              name="sub_name"
                              type="text"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.descrition) || ""}
                              onChange={(event) => {
                                this.ProductsHandleOnChangeProduct(event, -1);
                              }}
                              name="descrition"
                              type="text"
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.google_value) || ""}
                              onChange={(event) => {
                                this.ProductsHandleOnChangeProduct(event, -1);
                              }}
                              name="google_value"
                              type="text"
                              className="form-control"
                            />
                          </td>
                          <td colSpan={2} className="text-center">
                            <button
                              // disabled={this.isValidSubbusiness()}
                              // onClick={this.handleAddNewSubbusiness}
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
            {isListOfBusiness && (
              <BusinessCategories
                AreChanges={this.AreChanges}
                handleOnChangeIsActive={this.handleOnChangeIsActive}
                changeActiveBusiness={this.changeActiveBusiness}
                isAddBusiness={isAddBusiness}
                loading={loading}
                businesses={business}
                businessOwnerId={this.state.business_owner_id}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessPage;
