import React, { Component } from "react";
import { GetAllProduct, deleteProduct, updateProduct, ChangeProductToActive } from "../../services/Products";
import { AddProduct } from "../../services/Products";

class ListOfProducts extends Component {
  state = {
    products: [],
    isDefault: true,
    products_to_add: {},
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
    const business_id = this.props.business[this.state.index_business_id].place_id;
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
    const business_selected_id = this.props.business[index_business_id].place_id;
    const product = {
      business_owner_id: this.props.business_owner_id,
      business_id: this.props.business[index_business_id].place_id,
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

  handleOnClickSaveProduct = async (index) => {
    const product = this.state.products[index];
    const { name, price, is_active, product_id, business_id, description, discount_end_date, discount_start_date } = product;
    const req = {
      name,
      price,
      product_id,
      business_id,
      description,
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
      const business_selected_id = this.props.business[index].place_id;
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
    let isValidProduct =
      products_to_add && products_to_add["name"] && products_to_add["description"] && products_to_add["price"] ? false : true;
    return isValidProduct;
  };

  render() {
    const { products } = this.state;
    return (
      <React.Fragment>
        {" "}
        <div>
          <h4>Choose A Business</h4>
          <select id="business" onChange={this.handleOnChangeSelect} className="custom-select mb-4" style={{ width: "200px" }}>
            <option value={"default"} defaultValue>
              Business...
            </option>
            {this.props.business.map((business, index) => {
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
                      {this.props.business[this.state.index_business_id].name}
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
                            type="time"
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
                            type="time"
                            className="form-control"
                            value={products.discount_end_date}
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
                        type="time"
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
                        type="time"
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
      </React.Fragment>
    );
  }
}

export default ListOfProducts;
