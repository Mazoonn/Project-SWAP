import React, { Component } from "react";
import * as BusinessService from "../../services/Business";

class ListOfBusiness extends Component {
  state = {
    business: [],
    isDefault: true,
  };
  handleOnChangeBusiness = (event, index) => {
    const value = event.target.value;
    const name = event.target.name;

    const business_to_change = this.props.businesses;
    business_to_change[index][`${name}`] = value;
    this.setState({ business: business_to_change });
  };

  handleDeleteBusiness = async (indexBusiness) => {
    const business = this.props.businesses;
    await BusinessService.deleteBusiness({
      business_owner_id: this.props.businessOwnerId,
      place_id: business[indexBusiness].place_id,
    });
    delete business[indexBusiness];
    this.addNewValuesToBusiness(business);
    this.setState({ business });
  };

  addNewValuesToBusiness = (business) => {
    const values = ["name", "description", "opening_hours", "closing_hours", "rating", "icon", "is_active"];

    business.forEach((business) => {
      !business["name"] && (business["name"] = "");
      !business["description"] && (business["description"] = "");
      !business["opening_hours"] && (business["opening_hours"] = "");
      !business["closing_hours"] && (business["closing_hours"] = "");
      !business["rating"] && (business["rating"] = "");
      !business["icon"] && (business["icon"] = "");
      !business["is_active"] && (business["is_active"] = "");

      values.forEach((value) => {
        business[`${value}_new`] = business[value];
      });
    });
  };

  handleOnClickSaveBusiness = async (index) => {
    const { name, Icon, place_id, is_active, description, closing_hours, opening_hours } = this.props.businesses[index];
    const req = {
      business_owner_id: this.props.businessOwnerId,
      name,
      Icon,
      place_id,
      description,
      closing_hours,
      opening_hours,
    };
    await BusinessService.changeActiveBusiness({
      business_owner_id: this.props.businessOwnerId,
      place_id,
      is_active,
    });
    await BusinessService.editBusiness(req);
    const newListBusiness = await BusinessService.getAllBusiness(this.props.businessOwnerId);
    this.addNewValuesToBusiness(newListBusiness,...);
    this.setState({
      business: newListBusiness,
    });
  };

  isBusinessChange = (index) => {
    let result = false;
    const business = this.props.businesses[index];
    const values = ["name", "description", "opening_hours", "closing_hours", "icon", "is_active"];
    values.forEach((value) => {
      if (business[value] !== business[`${value}_new`]) result = true;
    });
    return result;
  };

  handleOnChangeIsActiveBusiness = async (index) => {
    const business = [...this.props.businesses];
    const newBusiness = business[index];
    newBusiness.is_active = !newBusiness.is_active;
    newBusiness.is_change = business.is_change === undefined ? true : !newBusiness.is_change;
    this.setState({ business });
  };

  render() {
    const { business } = this.state;
    return (
      <React.Fragment>
        <h3>businesses</h3>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Opening Hours</th>
              <th>Opening Closing</th>
              <th>Rating</th>
              <th>Icon</th>
              <th>Active</th>
              <th className="text-center">Save</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.businesses.map((business, index) => {
              return (
                <React.Fragment>
                  <tr key={business.place_id}>
                    <td>
                      <input
                        onChange={(event) => {
                          this.handleOnChangeBusiness(event, index);
                        }}
                        name="name"
                        type="text"
                        className="form-control"
                        value={business.name}
                      />
                    </td>

                    <td>
                      <input
                        onChange={(event) => {
                          this.handleOnChangeBusiness(event, index);
                        }}
                        name="description"
                        type="text"
                        className="form-control"
                        value={business.description}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(event) => {
                          this.handleOnChangeBusiness(event, index);
                        }}
                        name="opening_hours"
                        type="time"
                        className="form-control"
                        value={business.opening_hours}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(event) => {
                          this.handleOnChangeBusiness(event, index);
                        }}
                        name="closing_hours"
                        type="time"
                        className="form-control"
                        value={business.closing_hours}
                      />
                    </td>
                    <td>
                      <div>
                        <h2 className="text-center">{business.rating}</h2>
                      </div>
                    </td>
                    <td>
                      <input
                        onChange={(event) => {
                          this.handleOnChangeBusiness(event, index);
                        }}
                        name="icon"
                        type="text"
                        className="form-control"
                        value={business.icon}
                      />
                    </td>
                    <td className="text-center">
                      <div>
                        <input
                          onChange={() => {
                            this.handleOnChangeIsActiveBusiness(index);
                          }}
                          type="checkbox"
                          checked={business.is_active}
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          this.handleOnClickSaveBusiness(index);
                        }}
                        disabled={!this.isBusinessChange(index)}
                      >
                        Save
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          this.handleDeleteBusiness(index);
                        }}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ListOfBusiness;
