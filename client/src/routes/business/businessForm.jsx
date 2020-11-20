import React, { Component } from "react";
import * as BusinessService from "../../services/Business";
class BusinessForm extends Component {
  state = {
    formData: { business_owner_id: this.props.business_owner_id },
  };
  handleAddBusiness = async () => {
    const data = this.state.formData;
    await BusinessService.addBusiness({ ...data });
    window.location.reload();
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

  isDisable = (formDataInfo) => {
    //is active not needed
    const values = ["name", "description", "opening_hours", "closing_hours", "location", "Icon"];
    const length = Object.keys(formDataInfo).length;
    if (length >= Object.keys(values).length + 1) {
      for (var i = 0; i < length; i++) {
        if (formDataInfo[`${values[i]}`] === "" || formDataInfo[`${values[i]}`] === undefined) return false;
      }
    }
    return true;
  };
  render() {
    let { formData } = this.state;
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
              <input type="text" className="form-control" name="location" onBlur={this.handelOnChangeForm} />
            </div>

            <div className="col">
              <h3 Icon="">Icon:</h3>
              <input type="text" className="form-control" placeholder="" name="Icon" onBlur={this.handelOnChangeForm} />
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
