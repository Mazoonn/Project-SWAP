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
    const business_to_change = this.state.business;
    if (name === "is_active_new") {
      business_to_change[index][`is_active_new`] = event.target.checked;
    } else {
      business_to_change[index][`${name}`] = value;
    }

    this.setState({ business: business_to_change });
  };

  componentDidMount() {
    const all_business = this.props.business;
    this.setState({ business: all_business });
    this.addNewValuesToBusiness(all_business);
  }

  handleGetBusiness = async () => {
    let business = await BusinessService.getAllBusiness(this.state.business_owner_id);
    return business;
  };

  handleDeleteBusiness = async (indexBusiness) => {
    const business = this.state.business;
    await BusinessService.deleteBusiness({
      business_owner_id: this.props.businessOwnerId,
      place_id: business[indexBusiness].place_id,
    });
    delete business[indexBusiness];
    this.addNewValuesToBusiness(business);
    this.setState({ business });
  };

  addNewValuesToBusiness = (business) => {
    const values = ["name", "description", "opening_hours", "closing_hours", "rating", "Icon", "is_active"];
    business &&
      business.forEach((business) => {
        !business["name"] && (business["name"] = "");
        !business["description"] && (business["description"] = "");
        !business["opening_hours"] && (business["opening_hours"] = "");
        !business["closing_hours"] && (business["closing_hours"] = "");
        !business["Icon"] && (business["Icon"] = "");

        values.forEach((value) => {
          business[`${value}_new`] = business[value];
        });
      });
  };

  handleOnClickSaveBusiness = async (index) => {
    const { name, Icon, place_id, is_active, description, closing_hours, opening_hours } = this.state.business[index];
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
    this.addNewValuesToBusiness(newListBusiness);
    this.setState({
      business: newListBusiness,
    });
  };
  e;
  isBusinessChange = (index) => {
    let flag = false;
    const business = this.state.business[index];
    const values = ["name", "description", "opening_hours", "closing_hours", "Icon", "is_active"];
    business &&
      values.forEach((value) => {
        if (business[value] !== business[`${value}_new`]) flag = true;
      });
    return flag;
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
            {this.state.business &&
              this.state.business.map((business, index) => {
                return (
                  <React.Fragment>
                    <tr key={business.place_id}>
                      <td>
                        <input
                          onChange={(event) => {
                            this.handleOnChangeBusiness(event, index);
                          }}
                          name="name_new"
                          type="text"
                          className="form-control"
                          value={business[`name_new`]}
                        />
                      </td>

                      <td>
                        <input
                          onChange={(event) => {
                            this.handleOnChangeBusiness(event, index);
                          }}
                          name="description_new"
                          type="text"
                          className="form-control"
                          value={business[`description_new`]}
                        />
                      </td>
                      <td>
                        <input
                          onChange={(event) => {
                            this.handleOnChangeBusiness(event, index);
                          }}
                          name="opening_hours_new"
                          type="time"
                          className="form-control"
                          value={business[`opening_hours_new`]}
                        />
                      </td>
                      <td>
                        <input
                          onChange={(event) => {
                            this.handleOnChangeBusiness(event, index);
                          }}
                          name="closing_hours_new"
                          type="time"
                          className="form-control"
                          value={business[`closing_hours_new`]}
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
                          name="Icon_new"
                          type="text"
                          className="form-control"
                          value={business[`Icon_new`]}
                        />
                      </td>
                      <td className="text-center">
                        <div>
                          <input
                            onChange={(event) => {
                              this.handleOnChangeBusiness(event, index);
                            }}
                            type="checkbox"
                            name="is_active_new"
                            checked={business[`is_active_new`]}
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
