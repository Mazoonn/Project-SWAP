import React, { Component } from "react";
import { GetAllProduct, deleteProduct, updateProduct, ChangeProductToActive } from "../../services/Products";
import { AddProduct } from "../../services/Products";
import { getCurrentUser } from "../../services/authService";
import { getAllBusiness } from "../../services/Business";
class ListOfProducts extends Component {
  state = {
    products: [],
    business: [],
    business_owner_id: "",
    isDefault: true,
    products_to_add: {},
  };

  componentDidMount() {
    this.getState();
  }

  getState = async () => {
    const user = getCurrentUser();
    const business = await getAllBusiness(user[`user-id`]);
    this.setState({ business, formData: { business_owner_id: user[`user-id`] }, business_owner_id: user[`user-id`] });
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

  handleDeleteProduct = async (indexProduct) => {
    const business_id = this.state.business[this.state.index_business_id].place_id;
    const products = this.state.products;
    await deleteProduct({ business_id: business_id, product_id: products[indexProduct].product_id });
    delete products[indexProduct];
    this.addNewValuesToProducts(products);
    this.setState({ products });
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
        Products[`${value}_new`] = Products[value];
      });
    });
  };

  handleAddNewProduct = async () => {
    const { products_to_add, products, index_business_id } = this.state;
    const business_selected_id = this.state.business[index_business_id].place_id;
    const product = {
      business_owner_id: this.state.business_owner_id,
      business_id: this.state.business[index_business_id].place_id,
      ...products_to_add,
    };
    this.setState({ products: [...products, product] });
    await AddProduct(product);

    const newListProducts = await GetAllProduct(business_selected_id);

    this.setState({
      products: newListProducts,
    });
    this.addNewValuesToProducts(products);
  };

  handleOnClickSaveProduct = async (index) => {
    const {
      name,
      price,
      is_active,
      product_id,
      business_id,
      description,
      discount,
      discount_end_date,
      discount_start_date,
    } = this.state.products[index];
    const req = {
      name,
      price,
      product_id,
      business_id,
      description,
      discount,
      discount_end_date,
      discount_start_date,
    };
    await ChangeProductToActive({
      product_id,
      business_id,
      is_active,
    });
    await updateProduct(req);
    const newListProducts = await GetAllProduct(business_id);
    this.addNewValuesToProducts(newListProducts);
    this.setState({
      products: newListProducts,
    });
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

  isProductChange = (index) => {
    let result = false;
    const product = this.state.products[index];
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
    values.forEach((value) => {
      if (product[value] !== product[`${value}_new`]) result = true;
    });
    return result;
  };

  handleOnChangeIsActiveProducts = async (index) => {
    const products = [...this.state.products];
    const product = products[index];
    product.is_active = !product.is_active;
    product.is_change = product.is_change === undefined ? true : !product.is_change;
    this.setState({ products });
  };

  isValidProduct = () => {
    const { products_to_add } = this.state;
    let isValidProduct = this.isEmptyParam([products_to_add[`name`], products_to_add[`description`], products_to_add[`price`]]);

    if (!isValidProduct && products_to_add[`discount`] && products_to_add[`discount`] !== "")
      isValidProduct = this.isEmptyParam([
        products_to_add[`discount`],
        products_to_add[`discount_start_date`],
        products_to_add[`discount_end_date`],
      ]);

    return isValidProduct;
  };

  isEmptyParam = (arrayOfValues) => {
    let flag = false;
    arrayOfValues.forEach((value) => {
      flag = value === "" || value === undefined ? true : false;
      if (flag) return flag;
    });
    return flag;
  };

  render() {
    const { products } = this.state;
    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Products By Selected Business</h5>
          <div className="card-body">
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
                {this.state.business &&
                  this.state.business.map((business, index) => {
                    return (
                      <option key={business.place_id} value={index}>
                        {business.place_info.name}
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
                                value={products.discount === 0 ? "" : products.discount}
                              />
                            </td>
                            <td>
                              <input
                                onChange={(event) => {
                                  this.handleOnChangeProduct(event, index);
                                }}
                                name="discount_start_date"
                                type="date"
                                className="form-control"
                                value={
                                  products.discount_start_date.slice(0, 10) === `0001-01-01`
                                    ? ""
                                    : products.discount_start_date.slice(0, 10)
                                }
                              />
                            </td>
                            <td>
                              <input
                                onChange={(event) => {
                                  this.handleOnChangeProduct(event, index);
                                }}
                                name="discount_end_date"
                                type="date"
                                className="form-control"
                                value={
                                  products.discount_end_date.slice(0, 10) === `0001-01-01`
                                    ? ""
                                    : products.discount_end_date.slice(0, 10)
                                }
                              />
                            </td>
                            <td className="text-center">
                              <div>
                                <input
                                  onChange={() => {
                                    this.handleOnChangeIsActiveProducts(index);
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
                                  this.handleOnClickSaveProduct(index);
                                }}
                                disabled={!this.isProductChange(index)}
                              >
                                Save
                              </button>
                            </td>
                            <td className="text-center">
                              <button
                                onClick={() => {
                                  this.handleDeleteProduct(index);
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
                            type="date"
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
                            type="date"
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListOfProducts;
