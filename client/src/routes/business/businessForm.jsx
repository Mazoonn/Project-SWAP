import React, { Component } from "react";
import { getAllMainCategoriesAdmin } from "../../services/Categories";
import * as BusinessService from "../../services/Business";
import SearchLocation from "../admin/events/searchLocation";
import { getSubCategoriesId } from "../../services/SubCategory";
import getAddress from "../../services/Address";
import { getCurrentUser } from "../../services/authService";

const isDisable = (formDataInfo) => {
  //is active not needed
  const values = ["name", "description", "opening_hours", "closing_hours", "address", "main_id", "sub_id"];
  let isEmptyAddress = false;
  values.forEach((value) => {
    if (!formDataInfo[value]) isEmptyAddress = true;
  });
  return isEmptyAddress;
};
class BusinessForm extends Component {
  state = {
    formData: {},
    mainCategoryList: [],
    subCategoryList: [],
    mainCategorySelectedIndex: 0,
    place: {},
    address: "",
  };

  async componentDidMount() {
    const user = getCurrentUser();
    this.setState({ formData: { business_owner_id: user[`user-id`] } });
    const mainCategoryList = await getAllMainCategoriesAdmin();
    this.setState({ mainCategoryList });
  }

  setAddress = (place) => {
    const formData = { ...this.state.formData };
    formData.address = {};
    if (place.address_components) {
      formData.address = getAddress(place);
      formData.address.place_id = place.place_id;
      formData.address.place_id = place.place_id;
      formData.address.latitude = place.geometry.location.lat();
      formData.address.longitude = place.geometry.location.lng();
      formData.address.name = formData.name;
      formData.address.description = formData.description;
    }
    this.setState({ formData });
  };

  handleAddBusiness = async () => {
    const formData = this.state.formData;
    const business = {
      business_owner_id: this.state.formData.business_owner_id,
      business_id: formData.address.place_id,
      is_active: formData.is_active,
      opening_hours: formData.opening_hours,
      closing_hours: formData.closing_hours,
      place_id: formData.address.place_id,
    };
    await BusinessService.addBusiness(business, formData.address, {
      main_id: formData.main_id,
      sub_id: formData.sub_id,
      place_id: formData.address.place_id,
    });
  };

  handleChangeSearch = (address) => {
    this.setState({ address });
  };

  handelOnChangeForm = (event) => {
    const formData = { ...this.state.formData };
    const input = event.target.name;
    if (input === "is_active") {
      formData[`${input}`] = event.target.checked;
    } else {
      formData[`${input}`] = event.target.value;
    }
    this.setState({ formData: { ...formData } });
  };

  handleOnChangeSelectMain = async (event) => {
    const index = event.target.value;
    this.setState({ subCategoryList: [] });
    if (index !== "default") {
      const category_id = this.state.mainCategoryList[index].id;
      const newSubCategories = await getSubCategoriesId(category_id);
      this.setState({
        subCategoryList: newSubCategories,
        mainCategorySelectedIndex: index,
        formData: { ...this.state.formData, main_id: category_id },
      });
    }
  };

  handleOnChangeSelectSub = async (event) => {
    const index = event.target.value;
    if (index !== "default") {
      //TODO multipult select
      const sub_category_id = this.state.subCategoryList[index].sub_id;
      this.setState({
        formData: { ...this.state.formData, sub_id: { ...this.state.formData.sub_id, [`${sub_category_id}`]: sub_category_id } },
      });
    }
  };

  render() {
    let { formData, mainCategoryList, address, place, mainCategorySelectedIndex, subCategoryList } = this.state;

    return (
      <div className="card m-auto">
        <h5 className="card-header">Business Information</h5>
        <div className="card-body">
          <form>
            <div class="form-row">
              <div className="col">
                <h6 className="">Name:</h6>
                <input type="text" className="form-control" name="name" onBlur={this.handelOnChangeForm} />
              </div>
              <div className="col">
                <h6 className="">Description:</h6>
                <input type="text" className="form-control" name="description" onBlur={this.handelOnChangeForm} />
              </div>
            </div>
            <div class="form-row">
              <div className="col">
                <h6 className="">Opening Hours:</h6>
                <input type="time" className="form-control" name="opening_hours" onBlur={this.handelOnChangeForm} />
              </div>
              <div className="col">
                <h6 className="">Closing Hours:</h6>
                <input type="time" className="form-control" name="closing_hours" onBlur={this.handelOnChangeForm} />
              </div>
            </div>
            <div class="form-row">
              <div className="col">
                <h6 className="">Location:</h6>
                <SearchLocation setAddress={this.setAddress} error={false} disabled={false} />
              </div>
              <div>
                <div className="col">
                  <div>
                    <h6 className="">Active:</h6>
                    <input
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
            <div class="form-row">
              <div className="col">
                <h6 className="">Main category:</h6>
                <select name="main_categories" onChange={this.handleOnChangeSelectMain} className="custom-select mb-4">
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
                <h6 className="">Sub category:</h6>
                <select
                  onClick={this.handleOnChangeSelectSub}
                  name="sub_categories"
                  className="custom-select mb-4 colorful-select dropdown-primary md-form"
                  multiple
                  searchable="Search here.."
                >
                  <option value="" disabled selected>
                    Multiple Select of Sub Categories (ctrl + Command)
                  </option>
                  {subCategoryList &&
                    subCategoryList.map((category, index) => {
                      return (
                        <option key={category.sub_id} value={index}>
                          {category.sub_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div class="col-auto my-1">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={this.handleAddBusiness}
                disabled={isDisable(this.state.formData)}
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
