import React, { Component } from "react";
import { getAllMainCategoriesAdmin } from "../../services/Categories";
import * as BusinessService from "../../services/Business";
import * as PlaceService from "../../services/place";
import { getSubCategoriesId } from "../../services/SubCategory";
import LocationSearchInput from "../../components/LocationSearchInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class BusinessForm extends Component {
  state = {
    formData: { business_owner_id: this.props.business_owner_id },
    mainCategoryList: [],
    subCategoryList: [],
    mainCategorySelectedIndex: 0,

    place: {},
    address: "",
  };

  async componentDidMount() {
    const mainCategoryList = await getAllMainCategoriesAdmin();
    this.setState({ mainCategoryList });
  }

  handleAddBusiness = async () => {
    const data = this.state.formData;
    const place_id = await PlaceService.AddPlace(this.state.place);
    if (place_id) {
      await BusinessService.addBusiness({ ...data, place_id });
      await PlaceService.addOrEditPlaceToCategory({ main_id: data.main_id, sub_id: data.sub_id, place_id });
    }
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

  getPlaceClass = async (GooglePlaceObject) => {
    let LatLng = await getLatLng(GooglePlaceObject);
    let place = {
      place_id: GooglePlaceObject.place_id,
      latitude: LatLng.lat,
      longitude: LatLng.lng,
      city: "",
      country: "",
      street: "",
      street_number: "",
      post_code: "",
    };

    const AddressArray = GooglePlaceObject.formatted_address.split(",");

    switch (AddressArray.length) {
      case 4:
        place.post_code = GooglePlaceObject[AddressArray.length - 2];
      case 3:
        place.street = AddressArray[0]
          .match(/[a-zA-Z\s]/g)
          .join("")
          .trim();
        place.street_number = AddressArray[0].match(/\d/g) ? AddressArray[0].match(/\d/g).join("") : "";
        place.city = AddressArray[1].trim();
        place.country = AddressArray[AddressArray.length - 1];
        break;
    }
    return place;
  };

  handleSelectSearch = async (address) => {
    let GooglePlaceObject = await geocodeByAddress(address);
    if (GooglePlaceObject[0].formatted_address.split(",").length >= 3) {
      const place = await this.getPlaceClass(GooglePlaceObject[0]);
      this.setState({ address, place });
    }
  };

  handleOnChangeSelectSub = async (event) => {
    const index = event.target.value;
    if (index !== "default") {
      const sub_category_id = this.state.subCategoryList[index].sub_id;
      this.setState({ formData: { ...this.state.formData, sub_id: sub_category_id } });
    }
  };

  isDisable = (formDataInfo) => {
    //is active not needed
    const values = ["name", "description", "opening_hours", "closing_hours", "location", "main_id", "sub_id"];
    const length = Object.keys(formDataInfo).length;
    if (length >= Object.keys(values).length + 1) {
      for (var i = 0; i < length; i++) {
        if (formDataInfo[`${values[i]}`] === "" || formDataInfo[`${values[i]}`] === undefined) return false;
      }
    }

    return true;
  };
  render() {
    let { formData, mainCategoryList, address, place, mainCategorySelectedIndex, subCategoryList } = this.state;
    return (
      <React.Fragment>
        <form>
          <div class="form-row">
            <div className="col">
              <h3 className="">Name:</h3>
              <input type="text" className="form-control" name="name" onBlur={this.handelOnChangeForm} />
            </div>
            <div className="col">
              <h3 className="">Description:</h3>
              <input type="text" className="form-control" name="description" onBlur={this.handelOnChangeForm} />
            </div>
          </div>
          <div class="form-row">
            <div className="col">
              <h3 className="">Opening Hours:</h3>
              <input type="time" className="form-control" name="opening_hours" onBlur={this.handelOnChangeForm} />
            </div>
            <div className="col">
              <h3 className="">Closing Hours:</h3>
              <input type="time" className="form-control" name="closing_hours" onBlur={this.handelOnChangeForm} />
            </div>
          </div>
          <div class="form-row">
            <div className="col">
              <h3 className="">Location:</h3>
              <LocationSearchInput
                AddPlace={this.AddPlace}
                place={place}
                address={address}
                handleSelectSearch={this.handleSelectSearch}
                handleChangeSearch={this.handleChangeSearch}
              />
            </div>
          </div>
          <div class="form-row">
            <div className="col">
              <h3 className="">Main category:</h3>
              <select
                name="main_categories"
                onChange={this.handleOnChangeSelectMain}
                className="custom-select mb-4"
                style={{ width: "200px" }}
              >
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
              <h3 className="">Sub category:</h3>
              <select
                name="sub_categories"
                onChange={this.handleOnChangeSelectSub}
                className="custom-select mb-4"
                style={{ width: "200px" }}
              >
                <option value={"default"} defaultValue>
                  Sub Category...
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
          <div>
            <div className="form-row">
              <div>
                <h3 className="">Active:</h3>
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
        </form>
        <br />
        <br />
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-primary" onClick={this.handleAddBusiness} disabled={this.isDisable(formData)}>
            Add
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessForm;
