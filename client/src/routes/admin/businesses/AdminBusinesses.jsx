import React, { Component } from "react";
import { getNotApprovedBusinesses, paginate, approvesBusinesses } from "../../../services/AdminServices";
import AdminBusinessRaw from "./AdminBusinessRaw";
import Pagination from "./../AdminPagination";
import UserModal from "./AdminUserModal";
import BusinessModal from "./AdminBusinessModal";
import DescriptionModal from "./AdminDescriptionModal";

const filterBusinesses = (businesses, name, email, country, approves) => {
  return businesses.filter(
    (business) =>
      business["name"].toLowerCase().startsWith(name.toLowerCase()) &&
      business.user["email"].toLowerCase().startsWith(email.toLowerCase()) &&
      business["country"].toLowerCase().startsWith(country.toLowerCase()) &&
      (!approves || business["approve"])
  );
};

class AdminBusinesses extends Component {
  state = {
    businesses: [],
    loading: false,
    modal: {
      user: {},
      business: {},
      description: {
        value: "",
        isActive: false,
      },
    },
    filter: {
      email: "",
      name: "",
      country: "",
      approves: false,
    },
    pageSize: 10,
    currentPage: 1,
  };

  componentDidMount() {
    document.title = "Businesses";
    this.getBusinesses();
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleExitUserModal = () => {
    const modal = { ...this.state.modal };
    modal["user"] = {};
    this.setState({ modal });
  };

  getBusinesses = async () => {
    this.setState({ loading: true });
    try {
      const businesses = await getNotApprovedBusinesses();
      this.setState({ businesses: businesses.data, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  handleOnClickApproveFilter = () => {
    const filter = { ...this.state.filter };
    filter["approves"] = !filter["approves"];
    this.setState({ filter, currentPage: 1 });
  };

  handleOnChangeApprove = (business) => {
    const businesses = [...this.state.businesses];
    const index = businesses.indexOf(business);
    businesses[index]["approve"] = !businesses[index]["approve"];
    this.setState({ businesses });
  };

  handleOnChangeFilter = (name, value) => {
    const filter = { ...this.state.filter };
    filter[name] = value;
    this.setState({ filter, currentPage: 1 });
  };

  handleOnClickUser = (user) => {
    const modal = { ...this.state.modal };
    modal["user"] = user;
    this.setState({ modal });
  };

  handleOnClickBusiness = (business) => {
    const modal = { ...this.state.modal };
    modal["business"] = business;
    this.setState({ modal });
  };

  handleExitBusinessModal = () => {
    const modal = { ...this.state.modal };
    modal["business"] = {};
    this.setState({ modal });
  };

  handleOnClickDescriptionModal = (value) => {
    const modal = { ...this.state.modal };
    modal["description"]["value"] = value;
    modal["description"]["isActive"] = true;
    this.setState({ modal });
  };

  handleExitDescriptionModal = () => {
    const modal = { ...this.state.modal };
    modal["description"]["value"] = "";
    modal["description"]["isActive"] = false;
    this.setState({ modal });
  };

  handleClickOnSave = async () => {
    this.setState({ loading: true });
    const request = [];
    this.state.businesses.forEach((business) => {
      business["approve"] && request.push(business["businessId"]);
    });
    try {
      await approvesBusinesses(request);
      const businesses = this.state.businesses.filter((b) => !b["approve"]);
      this.setState({ businesses, loading: false, currentPage: 1 });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  areChanges = () => {
    return this.state.businesses.some((business) => business["approve"]);
  };

  render() {
    const { businesses, filter, currentPage, pageSize, modal, loading } = this.state;
    const { email, name, country, approves } = filter;
    const { user, business, description } = modal;
    const filteredBusinesses = filterBusinesses(businesses, name, email, country, approves);
    const totalCount = filteredBusinesses.length;
    const newBusinesses = paginate(filteredBusinesses, currentPage, pageSize);

    if (loading)
      return (
        <React.Fragment>
          <div className="card m-auto">
            <h5 className="card-header">Businesses</h5>
            <div className="card-body">
              <div className="text-center">
                <div className="spinner-border text-primary">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Businesses</h5>
          <div className="card-body">
            <div className="input-group w-75 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Filter User Email"
                value={email}
                name="email"
                onChange={(event) => {
                  this.handleOnChangeFilter(event.target.name, event.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Filter Business Name"
                value={name}
                name="name"
                onChange={(event) => {
                  this.handleOnChangeFilter(event.target.name, event.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Filter Country"
                value={country}
                name="country"
                onChange={(event) => {
                  this.handleOnChangeFilter(event.target.name, event.target.value);
                }}
              />
              <button onClick={this.handleOnClickApproveFilter} className="btn btn-sm btn-primary ml-1">
                Approves
              </button>
            </div>
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Business Name</th>
                  <th className="text-center">Business Description</th>
                  <th>Country</th>
                  <th className="text-center">Business Info</th>
                  <th className="text-center">User Info</th>
                  <th className="text-center">Approve</th>
                </tr>
              </thead>
              <tbody>
                {newBusinesses.map((business, index) => (
                  <AdminBusinessRaw
                    key={index}
                    handleOnClickUser={this.handleOnClickUser}
                    handleOnClickBusiness={this.handleOnClickBusiness}
                    business={business}
                    handleOnChangeApprove={this.handleOnChangeApprove}
                    handleOnClickDescriptionModal={this.handleOnClickDescriptionModal}
                  />
                ))}
              </tbody>
            </table>
            <div className="text-center">
              <button className="btn btn-primary" type="button" disabled={!this.areChanges()} onClick={this.handleClickOnSave}>
                Save Changes
              </button>
            </div>
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
            <UserModal user={user} handleExitModal={this.handleExitUserModal} />
            <BusinessModal business={business} handleExitModal={this.handleExitBusinessModal} />
            <DescriptionModal description={description} handleExitModal={this.handleExitDescriptionModal} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminBusinesses;
