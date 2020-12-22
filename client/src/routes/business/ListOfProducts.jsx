import React, { Component } from "react";
import { getCurrentUser } from "../../services/authService";
import { getAllBusinesses } from "../../services/Business";
import { deleteProduct, GetAllProducts, AddProduct, ChangeProductActive, updateProduct } from "../../services/productService";
import ProductRaw from './ProductRaw';
import NewProductRaw from './newProductRaw';
import ExistProductModal from './ExistsProductModal';

//set new values to product
const copyNewValues = product =>
{
  const values = [ "name", "is_active", "description", "discount_start_date", "discount_end_date", "discount", "price" ];
  values.forEach(value => 
    {
      product[value] = product[`${value}_new`];
    });
};


//Products page
class ListOfProducts extends Component {
  state = {
    products: [],
    businesses: [],
    businessOwnerId: "",
    indexBusinessId: "default",
    productToAdd: {},
    loading: false,
    error: { productExists :false, name: "" }
  };

  //set title and get businesses
  componentDidMount() {
    this.mounted = true;
    document.title = "Products"
    if(this.mounted) this.getState();
  }

  //Stop all asynchouries calls
  componentWillUnmount()
  {
    this.mounted = false;
  }

  //set user id and all his businesses to state
  getState = async () => {
    const user = getCurrentUser();
    this.setState({ loading: true, businessOwnerId: user[`user-id`] })
    try
    {
      const businesses = await getAllBusinesses(user[`user-id`]);
      this.setState({ businesses: businesses.data } );
    }
    catch(err)
    {
      console.log(err);
    }
    finally
    {
      this.setState({ loading: false });
    }
  };

  //Set values of product to state
  handleOnChangeProduct = (event, index) => {
    const { name, value } = event.target;
    if(name === "price" && value < 0) return;
    if(name === "discount" && (value < 0 || value > 100)) return;
    if (index !== this.state.products.length) {
      const products = [ ...this.state.products ];
      products[index][`${name}_new`] = value;
      this.setState({ products });
    } else {
      const productToAdd = { ...this.state.productToAdd };
      if (name === "is_active") productToAdd[name] = event.target.checked;
      else {
        productToAdd[name] = value;
      }
      this.setState({ productToAdd });
    }
  };

  //delete button
  handleDeleteProduct = async (indexProduct) => {
    const { businessOwnerId: client_id } = this.state;
    const product = this.state.products[indexProduct];
    this.setState({ loading: true });
    try
    {
      await deleteProduct({ business_id: product.business_id, product_id: product.product_id, client_id });
      const products = this.state.products.filter(p => p !== product);
      this.setState({ products });
    }
    catch(err)
    {
      console.log(err);
    }
    finally
    {
      this.setState({ loading: false });
    }
  };

  //add new values to product
  addNewValuesToProduct = product =>
  {
    const values = [
      "name",
      "is_active",
      "description",
    ];
    const dates = [ "discount_start_date", "discount_end_date" ];
    const numbers = [ "discount", "price" ];

    values.forEach((value) => {
      !product[value] && (product[value] = "")
      product[`${value}_new`] = product[value];
    });
    dates.forEach(date => 
      {
        product[date] = product[date].slice(0, product[date].length - 9);
        product[`${date}_new`] = product[date];
      });
    numbers.forEach(value => 
      {
        product[value] = product[value].toString();
        product[`${value}_new`] = product[value];
      });
  };

  //add new values to all products
  addNewValuesToProducts = products => {
    products.forEach(product => 
      {
        this.addNewValuesToProduct(product);
      });
  };

  //add new product button
  handleAddNewProduct = async () => {
    const { productToAdd, indexBusinessId, businessOwnerId } = this.state;
    const business_selected_id = this.state.businesses[indexBusinessId].place_id;
    const product = {
      businessOwnerId,
      business_id: business_selected_id,
      ...productToAdd,
    };
    this.setState({ loading: true });
    try
    {
      const newProduct = await AddProduct(product, businessOwnerId);
      const products = [ ...this.state.products ];
      this.addNewValuesToProduct(newProduct.data);
      products.push(newProduct.data);
      this.setState({ products, productToAdd: {} });
    }
    catch(err)
    {
      if (err.response && err.response.status === 409)
      this.setState({ error: { productExists: true, name: product.name } });
    }
    finally
    {
      this.setState({ loading: false });
    }
  };

  //save button handler
  handleOnClickSaveProduct = async (index) => {
    const { businessOwnerId } = this.state;
    const products = [...this.state.products];
    const {
      name_new: name,
      price_new: price,
      is_active_new: is_active,
      product_id,
      business_id,
      description_new: description,
      discount_new: discount,
      discount_end_date_new: discount_end_date,
      discount_start_date_new: discount_start_date,
    } = products[index];
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
    this.setState({ loading: true });
    try
    {
      await ChangeProductActive({
        product_id,
        business_id,
        is_active,
      }, businessOwnerId);
      await updateProduct(req, businessOwnerId);
      copyNewValues(products[index]);
      this.setState({ products });
    }
    catch(err)
    {
      if (err.response && err.response.status === 409)
      this.setState({ error: { productExists: true, name } });
    }
    finally
    {
      this.setState({ loading: false });
    }
  };


  //on change select handler
  handleOnChangeSelect = async event => {
    const indexBusinessId = event.target.value;
    if (indexBusinessId !== "default") 
    {
      const { businessOwnerId } = this.state;
      const business_selected_id = this.state.businesses[indexBusinessId].place_id;
      this.setState({ loading: true });
      try
      {
        const products = await GetAllProducts(business_selected_id, businessOwnerId);
        this.addNewValuesToProducts(products.data);
        this.setState({ products:products.data });
      }
      catch(err)
      {
        console.log(err);
      }
      finally
      {
        this.setState({ loading: false });
      }
    }
    else
    this.setState({ products: [] });
    this.setState({ indexBusinessId, productToAdd: {} })
  };

  //check if product values changed
  isProductChanged = index => {
    const product = this.state.products[index];
    const values = [
      "name",
      "description",
      "price",
      "discount",
      "discount_start_date",
      "discount_end_date",
    ];

    return ((values.some(value => product[value] !== product[`${value}_new`]) || product.is_active !== product.is_active_new) &&
    !values.some(value => !product[`${value}_new`]));
  };

  //on change Is Active handler
  handleOnChangeIsActiveProducts = index => {
    const products = [...this.state.products];
    const product = products[index];
    product.is_active_new = !product.is_active_new;
    this.setState({ products });
  };

  //check if product values are not empty
  isNotValidProduct = () => 
  {
    const { productToAdd } = this.state;
    const values = [
      "name",
      "description",
      "price",
      "discount",
      "discount_start_date",
      "discount_end_date",
    ];

    return values.some(value => !productToAdd[value]);
  };

  //close error modal
  handleCloseErrorModal = () =>
  {
    this.setState({ error: { productExists: false, name: "" } });
  };

  render() {
    const { products, businesses , indexBusinessId, productToAdd, loading } = this.state;
    const { productExists, name } = this.state.error;

    if(loading) return (
    <div className="card m-auto">
      <h5 className="card-header">Products by selected business</h5>
      <div className="card-body">
        <div className="text-center">
          <div className="spinner-border text-primary">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>);

    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Products by selected business</h5>
          <div className="card-body">
            <div>
              <h4>Choose a business</h4>
              <select
                value={indexBusinessId}
                id="business"
                onChange={this.handleOnChangeSelect}
                className="custom-select mb-4"
                style={{ width: "200px" }}
              >
                <option value={"default"}>
                  Business...
                </option>
                {businesses &&
                  businesses.map((business, index) => {
                    return (
                      <option key={business.place_id} value={index}>
                        {business.place_info.name}
                      </option>
                    );
                  })}
              </select>
              {indexBusinessId !== "default" && (
                <div>
                  <h3>Products</h3>
                  <table className="table table-bordered table-sm mt-4">
                    <thead>
                      <tr>
                        <th colSpan={9} className="text-center">
                          {businesses[indexBusinessId].place_info.name}
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
                      {products.map((product, index) => {
                        return (
                        <ProductRaw
                        key={index}
                        index={index}
                        handleDeleteProduct={this.handleDeleteProduct}
                        handleOnChangeIsActiveProducts={this.handleOnChangeIsActiveProducts}
                        handleOnChangeProduct={this.handleOnChangeProduct}
                        handleOnClickSaveProduct={this.handleOnClickSaveProduct}
                        isProductChanged={this.isProductChanged}
                        product={product}
                        />);
                      })}
                        <NewProductRaw
                          handleAddNewProduct={this.handleAddNewProduct}
                          handleOnChangeProduct={this.handleOnChangeProduct}
                          isNotValidProduct={this.isNotValidProduct}
                          length={products.length}
                          product={productToAdd}
                         />
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <ExistProductModal
          isActive={productExists}
          name={name} 
          handleClose={this.handleCloseErrorModal}
        />
      </React.Fragment>
    );
  }
}

export default ListOfProducts;
