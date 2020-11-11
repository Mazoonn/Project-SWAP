import React, { Component } from "react";
import BusinessButtons from "./businessButtons";
import BusinessCategories from "./BusinessCategories";
import { getAllBusiness, changeActiveBusiness } from "../../services/Business";
import { AddProduct } from "../../services/Products";
import { GetAllProduct } from "../../services/Products";
import { businessForm } from "./businessForm";
class BusinessPage extends Component {
  state = {
    business: [],
    products: [],
    products_to_add: {},
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

  handleOnSelectButton = async (event) => {
    const indexOfButton = event.target.id;
    this.setState({ index_business_id: event.target.value });
    this.setState({ isAddBusiness: false, isListOfBusiness: false, isProducts: false });
    switch (indexOfButton) {
      case "add business":
        this.setState({ isAddBusiness: true });
        break;
      case "list of business":
        this.setState({ isListOfBusiness: true });
        await this.handleGetBusiness();
        break;
      case "products":
        await this.handleGetBusiness();
        this.setState({ isProducts: true });
        break;
    }
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
    this.setState({ products: [] });
    const index = event.target.value;
    if (index !== "default") {
      const business_selected_id = this.state.business[index].place_id;
      const products = await GetAllProduct(business_selected_id);
      if (products) {
        this.addNewValuesToProducts(products);
        this.setState({ products, isDefault: false, index_business_id: index });
      } else {
        this.setState({ isDefault: false, index_business_id: index });
      }
    } else this.setState({ isDefault: true });
  };

  handleAddNewProduct = async () => {
    const { business_owner_id, products_to_add, products, index_business_id } = this.state;
    const business_selected_id = this.state.business[index_business_id].place_id;
    const product = {
      business_owner_id: business_owner_id,
      business_id: this.state.business[index_business_id].place_id,
      ...products_to_add,
    };
    this.setState({ products: [{ ...products, [`${products.length}`]: product }] });
    await AddProduct(product);

    const newListProducts = await GetAllProduct(business_selected_id);

    this.setState({
      products: newListProducts,
    });
    this.addNewValuesToProducts(products);
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
      !Products["description"] && (Products["description"] = "");
      !Products["price"] && (Products["price"] = "");
      !Products["discount"] && (Products["discount"] = "");
      !Products["discount_start_date"] && (Products["discount_start_date"] = "");
      !Products["discount_end_date"] && (Products["discount_end_date"] = "");
      !Products["is_active"] && (Products["is_active"] = "");

      values.forEach((value) => {
        Products[`${value}`] = Products[value];
      });
    });
  };

  isValidProduct = () => {
    const { products_to_add } = this.state;
    let isValidProduct =
      products_to_add && products_to_add["name"] && products_to_add["description"] && products_to_add["price"] ? false : true;
    return isValidProduct;
  };

  handleOnChangeProduct = (event, index) => {
    const value = event.target.value;
    const name = event.target.name;
    if (index !== this.state.products.length) {
      const products_to_change = this.state.products;
      products_to_change[index][`${name}`] = value;
      this.setState({ products: products_to_change });
    } else {
      let products_to_add = this.state.products_to_add;
      if (name === "is_active") products_to_add[`${name}`] = event.target.checked;
      else {
        products_to_add[`${name}`] = value;
        this.setState({ products_to_add });
      }
    }
  };

  render() {
    const { isAddBusiness, loading, business, isProducts, isListOfBusiness, products } = this.state;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <BusinessButtons
              handleOnSelectButton={this.handleOnSelectButton}
              isAddBusiness={isAddBusiness}
              isProducts={isProducts}
              isListOfBusiness={isListOfBusiness}
            />
          </div>
          <div className="col">
            {this.state.isProducts && (
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
                  <div>
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
                            <tr key={products.place_id}>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeProduct(event, index);
                                  }}
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  value={products.name}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeProduct(event, index);
                                  }}
                                  name="description"
                                  type="text"
                                  className="form-control"
                                  value={products.description}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeProduct(event, index);
                                  }}
                                  name="price"
                                  type="text"
                                  className="form-control"
                                  value={products.price}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeProduct(event, index);
                                  }}
                                  name="discount"
                                  type="text"
                                  className="form-control"
                                  value={products.discount}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeProduct(event, index);
                                  }}
                                  name="discount_start_date"
                                  type="text"
                                  className="form-control"
                                  value={products.discount_start_date}
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(event) => {
                                    this.handleOnChangeProduct(event, index);
                                  }}
                                  name="discount_end_date"
                                  type="text"
                                  className="form-control"
                                  value={products.discount_end_date}
                                />
                              </td>
                              <td className="text-center">
                                <div>
                                  <input
                                    onChange={() => {
                                      //  props.handleOnChangeIsActive(index);
                                    }}
                                    type="checkbox"
                                    checked={products.is_active}
                                  />
                                </div>
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    // this.handleOnClickSaveSubbusiness(index);
                                  }}
                                  //disabled={!this.isSubbusinessChange(index)}
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
                              value={(products && products.name) || ""}
                              onChange={(event) => {
                                this.handleOnChangeProduct(event, this.state.products.length);
                              }}
                              name="name"
                              type="text"
                              className="form-control"
                              value={products.name}
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.description) || ""}
                              onChange={(event) => {
                                this.handleOnChangeProduct(event, this.state.products.length);
                              }}
                              name="description"
                              type="text"
                              className="form-control"
                              value={products.description}
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.price) || ""}
                              onChange={(event) => {
                                this.handleOnChangeProduct(event, this.state.products.length);
                              }}
                              name="price"
                              type="text"
                              className="form-control"
                              value={products.price}
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.discount) || ""}
                              onChange={(event) => {
                                this.handleOnChangeProduct(event, this.state.products.length);
                              }}
                              name="discount"
                              type="text"
                              className="form-control"
                              value={products.discount}
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.discount_start_date) || ""}
                              onChange={(event) => {
                                this.handleOnChangeProduct(event, this.state.products.length);
                              }}
                              name="discount_start_date"
                              type="text"
                              className="form-control"
                              value={products.discount_start_date}
                            />
                          </td>
                          <td>
                            <input
                              value={(products && products.discount_end_date) || ""}
                              onChange={(event) => {
                                this.handleOnChangeProduct(event, this.state.products.length);
                              }}
                              name="discount_end_date"
                              type="text"
                              className="form-control"
                              value={products.discount_end_date}
                            />
                          </td>
                          <td className="text-center">
                            <div>
                              <input
                                onChange={(event) => {
                                  this.handleOnChangeProduct(event, this.state.products.length);
                                }}
                                type="checkbox"
                                checked={products.is_active}
                                name="is_active"
                              />
                            </div>
                          </td>
                          <td colSpan={2} className="text-center">
                            <button
                              disabled={this.isValidProduct()}
                              onClick={this.handleAddNewProduct}
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              Add new product
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
            {isAddBusiness && <businessForm />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessPage;
