import React, { Component } from "react";
import * as BusinessService from "../../services/Business";
import { getCurrentUser } from "../../services/authService";
import { getAllBusiness } from "../../services/Business";
class ListOfBusiness extends Component {
  state = {
    business: [],
    business_owner_id: "",
    isDefault: true,
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ business_owner_id: user[`user-id`] });
    this.handleGetBusiness(user[`user-id`]);
  }

  handleOnChangeBusiness = (event, index) => {
    const value = event.target.value;
    const name = event.target.name;
    const business_to_change = this.state.business;
    if (name === "is_active_new") {
      business_to_change[index][`is_active_new`] = event.target.checked;
    } else if (name === "description_new" || name === "name_new") business_to_change[index].place_info[`${name}`] = value;
    else {
      business_to_change[index][`${name}`] = value;
    }
    this.setState({ business: business_to_change });
  };

  handleGetBusiness = async (business_owner_id) => {
    const business = await getAllBusiness(business_owner_id);
    this.addNewValuesToBusiness(business);
    this.setState({
      business,
    });
  };

  handleDeleteBusiness = async (indexBusiness) => {
    const business = this.state.business;
    await BusinessService.deleteBusiness({
      business_owner_id: this.state.business_owner_id,
      place_id: business[indexBusiness].place_id,
    });
    delete business[indexBusiness];
    this.addNewValuesToBusiness(business);
    this.setState({ business });
  };

  addNewValuesToBusiness = (business) => {
    const values = ["name", "description", "opening_hours", "closing_hours", "approve_by_admin", "is_active"];
    business &&
      business.forEach((business) => {
        !business.place_info["name"] && (business.place_info["name"] = "");
        !business.place_info["description"] && (business.place_info["description"] = "");
        !business["opening_hours"] && (business["opening_hours"] = "");
        !business["closing_hours"] && (business["closing_hours"] = "");
        !business["approve_by_admin"] && (business["approve_by_admin"] = false);
        values.forEach((value) => {
          if (value === "description" || value === "name") business.place_info[`${value}_new`] = business.place_info[value];
          else business[`${value}_new`] = business[value];
        });
      });
  };

  handleOnClickSaveBusiness = async (index) => {
    const { place_id, is_active_new, closing_hours_new, opening_hours_new } = this.state.business[index];
    const { name_new, description_new } = this.state.business[index].place_info;
    const req = {
      business_owner_id: this.state.business_owner_id,
      place_info: {
        description: description_new,
        name: name_new,
      },
      place_id,
      closing_hours: closing_hours_new,
      opening_hours: opening_hours_new,
    };
    await BusinessService.changeActiveBusiness({
      business_owner_id: this.state.business_owner_id,
      place_id,
      is_active: is_active_new,
    });
    await BusinessService.editBusiness(req);
    const newListBusiness = await BusinessService.getAllBusiness(this.state.business_owner_id);
    this.addNewValuesToBusiness(newListBusiness);
    this.setState({
      business: newListBusiness,
    });
  };

  isBusinessChange = (index) => {
    let flag = false;
    const business = this.state.business[index];
    const values = ["name", "description", "opening_hours", "closing_hours", "is_active"];
    business &&
      values.forEach((value) => {
        if ((value === "description" || value === "name") && business.place_info[value] !== business.place_info[`${value}_new`])
          flag = true;
        else if (business[value] !== business[`${value}_new`]) flag = true;
      });
    return flag;
  };

  render() {
    const { business } = this.state;

    return (
      <React.Fragment>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Opening Hours</th>
              <th>Opening Closing</th>
              <th>Approved by Admin</th>
              <th>Active</th>
              <th className="text-center">Save</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {business &&
              business.map((business, index) => {
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
                          value={business.place_info[`name_new`]}
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
                          value={business.place_info[`description_new`]}
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
                          <h4 className="text-center">{business.approve_by_admin ? "Yes" : "No"}</h4>
                        </div>
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
