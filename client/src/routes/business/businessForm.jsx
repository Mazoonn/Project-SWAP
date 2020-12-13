import React, { Component } from "react";
import { getAllMainCategories } from "../../services/Categories";
import { addBusiness } from "../../services/BusinessService";
import SearchLocation from "../admin/events/searchLocation";
import { getSubCategoriesId } from "../../services/SubCategory";
import getAddress from "../../services/Address";
import { getCurrentUser } from "../../services/authService";
import Select from 'react-select';

const addressValidate = (address) => {
  const schema = ["country", "settlement", "street"];

  if (schema.some((value) => !address[value])) return "Address must contain Country, Settlement and Street Name";
  return "";
};

const isDisable = (formDataInfo) => {
  const values = ["name", "description", "opening_hours", "address", "closing_hours", "main_id"];
  const b1 = values.some(value => !formDataInfo[value]);
  const b2 = formDataInfo.sub_ids ? formDataInfo.sub_ids.length === 0 : true;
  return b1 || b2;
};


class BusinessForm extends Component {
  state = {
    formData: {},
    mainCategoryList: [],
    subCategoryList: [],
    mainCategorySelectedIndex: "default",
    validation: {}
  };

  async componentDidMount() {
    const user = getCurrentUser();
    this.setState({ formData: { business_owner_id: user[`user-id`] } });
    const mainCategoryList = await getAllMainCategories();
    if(mainCategoryList) this.setState({ mainCategoryList });
  }

  setAddress = (place) => {
    const formData = { ...this.state.formData };
    formData.address = {};
    if (place.address_components) {
      formData.address = getAddress(place);
      formData.address.place_id = place.place_id;
      formData.address.latitude = place.geometry.location.lat();
      formData.address.longitude = place.geometry.location.lng();
    }
    this.setState({ formData });
  };

  handleAddBusiness = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
    const { address } = formData;
    const error = addressValidate(address);
    const { validation } = this.state;
    validation.address = error;
    this.setState({ validation });
    if(error) return null;
    const 
    { 
      business_owner_id, 
      closing_hours, 
      description, 
      is_active, 
      main_id, 
      name, 
      opening_hours,
      sub_ids
    } = formData;
    const business = 
    {
      business_owner_id,
      is_active: is_active !== undefined ? is_active : false,
      opening_hours,
      closing_hours
    };
    const placeCategory = 
    {
      mainId: main_id,
      subIds: sub_ids.map(sub => sub.value)
    };
    const place = Object.assign(address, 
    {
      name,
      description,
    });
    const request = { place, placeCategory, business };
    await addBusiness(request);
  };

  handelOnChangeForm = (event) => {
    const formData = { ...this.state.formData };
    const { name } = event.target;
    if (name === "is_active") {
      formData[name] = event.target.checked;
    } else {
      formData[name] = event.target.value;
    }
    this.setState({ formData });
  };

  handleOnChangeSelectMain = async (event) => {
    const mainCategorySelectedIndex = event.target.value;
    const formData = { ...this.state.formData };
    let subCategoryList = [];
    formData.sub_ids = [];

    if (mainCategorySelectedIndex !== "default") {
      const category_id = this.state.mainCategoryList[mainCategorySelectedIndex].id;
      subCategoryList = await getSubCategoriesId(category_id);
      formData.main_id = category_id;
    }
    else {
      formData.main_id = "";
    }
    this.setState({ mainCategorySelectedIndex, formData, subCategoryList });
  };

  handleOnChangeSelectSub = selectedOption  => 
  { 
    const formData = { ...this.state.formData };
    formData.sub_ids = selectedOption;
    this.setState({ formData });
  };

  render() {
    const { formData, mainCategoryList, mainCategorySelectedIndex, subCategoryList, validation } = this.state;
    const { address } = validation;
    const { sub_ids } = formData;

    return (
      <div className="card m-auto">
        <h5 className="card-header">Business Information</h5>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="col">
                <label htmlFor="name"><h6>Name:</h6>
                </label>
                <input placeholder="Enter business name" id="name" type="text" className="form-control" name="name" onChange={this.handelOnChangeForm} />
              </div>
              <div className="col">
                <label htmlFor="description">
                  <h6>Description:</h6>
                </label>
                <input type="text" placeholder="Enter business description" id="description" className="form-control" name="description" onChange={this.handelOnChangeForm} />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label htmlFor="opening_hours">
                <h6>Opening Hours:</h6>
                </label>               
                <input id="opening_hours" type="time" className="form-control" name="opening_hours" onChange={this.handelOnChangeForm} />
              </div>
              <div className="col">
                <label htmlFor="closing_hours">
                  <h6>Closing Hours:</h6>
                </label>
                <input id="closing_hours" type="time" className="form-control" name="closing_hours" onChange={this.handelOnChangeForm} />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label htmlFor="location">
                  <h6>Location:</h6>
                </label>              
                <SearchLocation 
                  id="location" 
                  setAddress={this.setAddress} 
                  error={address} 
                  disabled={false} />
              </div>
              <div>
                <div className="col">
                  <div>
                    <label htmlFor="is_active">
                      <h6>Active:</h6>
                    </label>           
                    <input
                      id="is_active"
                      type="checkbox"
                      className="form-control"
                      placeholder=""
                      name="is_active"
                      onChange={this.handelOnChangeForm}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <label htmlFor="main_categories">
                  <h6>Main category:</h6>
                </label>             
                <select value={mainCategorySelectedIndex} id="main_categories" name="main_categories" onChange={this.handleOnChangeSelectMain} className="custom-select mb-4">
                  <option value={"default"} defaultValue>
                    Main Category...
                  </option>
                  {mainCategoryList &&
                    mainCategoryList.map((category, index) => {
                      return (
                        <option key={category.id} value={index}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col">
                <label htmlFor="sub_categories"><h6>Subcategories:</h6></label>
                <div >
                  <Select
                    value={sub_ids}
                    onChange={this.handleOnChangeSelectSub}
                    closeMenuOnSelect={false}
                    inputId="sub_categories"
                    isSearchable 
                    isMulti
                    placeholder="Select subcategories"
                    options={subCategoryList.map(category => { return { value:category.sub_id, label:category.sub_name } })}
                  />
                </div> 
              </div>
            </div>
            <div className="col-auto my-1 text-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleAddBusiness}
                disabled={isDisable(formData)}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default BusinessForm;
