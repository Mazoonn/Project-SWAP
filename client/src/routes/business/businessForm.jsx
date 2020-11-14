import React, { Component } from "react";

class BusinessForm extends Component {
  handleAddBusiness = () => {};
  render() {
    return (
      <React.Fragment>
        <form>
          <div class="form-row">
            <div className="col">
              <h3 className="">Name:</h3>
              <input type="text" className="form-control" placeholder="" />
            </div>
            <div className="col">
              <h3 className="">Description:</h3>
              <input type="text" className="form-control" placeholder="" />
            </div>
          </div>
          <div class="form-row">
            <div className="col">
              <h3 className="">Opening Hours:</h3>
              <input type="time" className="form-control" />
            </div>
            <div className="col">
              <h3 className="">Closing Hours:</h3>
              <input type="time" className="form-control" />
            </div>
          </div>
          <div class="form-row">
            <div className="col">
              <h3 className="">Active:</h3>
              <input type="checkbox" className="form-control" placeholder="" />
            </div>
            <div className="col">
              <h3 Icon="">Location:</h3>
              <input type="text" className="form-control" placeholder="" />
            </div>
          </div>
        </form>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-primary" onClick={this.handleAddBusiness}>
            Add
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessForm;
