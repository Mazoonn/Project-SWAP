import React, { Component } from "react";
import * as BusinessService from "../../services/Business";
import { getCurrentUser } from "../../services/authService";
import { getAllBusinesses } from "../../services/Business";
import BusinessRaw from "./BusinessRaw";
import BusinessAddressModal from './businessAddressModal';
class ListOfBusiness extends Component {
  state = {
    businesses: [],
    business_owner_id: "",
    address: {},
    loading: false
  };

  componentDidMount() {
    this.mounted = true;
    document.title = "My businesses";
    const user = getCurrentUser();
    this.setState({ business_owner_id: user[`user-id`] });
    if(this.mounted) this.handleGetBusinesses(user[`user-id`]);
  }

  componentWillUnmount()
  {
    this.mounted = false;
  }

  handleOnChangeBusiness = (event, index) => {
    const { name, value } = event.target;
    const businesses = [ ...this.state.businesses ];
    if (name === "is_active_new") {
      businesses[index][`is_active_new`] = event.target.checked;
    } else if (name === "description_new" || name === "name_new") businesses[index].place_info[`${name}`] = value;
    else {
      businesses[index][`${name}`] = value;
    }
    this.setState({ businesses });
  };

  handleGetBusinesses = async business_owner_id => {
    this.setState({ loading: true });
    try
    {
      const businesses = await getAllBusinesses(business_owner_id);
      this.addNewValuesToBusiness(businesses.data);
      this.setState({ businesses: businesses.data });
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

  handleDeleteBusiness = async (indexBusiness) => {
    const stateBusinesses = this.state.businesses;
    this.setState({ loading: true });
    try
    {
      await BusinessService.deleteBusiness({
        business_owner_id: this.state.business_owner_id,
        place_id: stateBusinesses[indexBusiness].place_id,
      });
      const businesses = stateBusinesses.filter(business => business !== stateBusinesses[indexBusiness]);
      this.setState({ businesses });
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

  addNewValuesToBusiness = (businesses) => {
    const values = ["name", "description", "opening_hours", "closing_hours", "approve_by_admin", "is_active"];
    businesses &&
    businesses.forEach((business) => {
        !business.place_info["name"] && (business.place_info["name"] = "");
        !business.place_info["description"] && (business.place_info["description"] = "");
        business["opening_hours"] = business["opening_hours"].slice(0, business["opening_hours"].length -3)
        business["closing_hours"] = business["closing_hours"].slice(0, business["closing_hours"].length -3)
        !business["approve_by_admin"] && (business["approve_by_admin"] = false);
        values.forEach((value) => {
          if (value === "description" || value === "name") business.place_info[`${value}_new`] = business.place_info[value];
          else business[`${value}_new`] = business[value];
        });
      });
  };

  handleOnClickSaveBusiness = async (index) => {
    const business = this.state.businesses[index];
    const { place_id, is_active_new: is_active, closing_hours_new: closing_hours, opening_hours_new: opening_hours } = business;
    const { name_new: name, description_new: description } = business.place_info;
    const { business_owner_id } = this.state; 
    const req = {
      business_owner_id,
      place_info: {
        description,
        name,
      },
      place_id,
      closing_hours,
      opening_hours,
    };
    this.setState({ loading: true });
    try
    {
      await BusinessService.changeActiveBusiness({
        business_owner_id,
        place_id,
        is_active,
      });
      await BusinessService.editBusiness(req);
      const businesses = [ ...this.state.businesses ];
      businesses[index] = Object.assign(businesses[index], 
        {
          is_active,
          closing_hours,
          opening_hours,
          place_info: Object.assign(businesses[index].place_info, { name, description })
        });
      this.setState({ businesses });
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

  isBusinessDisabled = index => {
    let flag1 = true;
    let flag2 = false;
    const business = this.state.businesses[index];
    const values = ["name", "description", "opening_hours", "closing_hours", "is_active"];
      values.forEach((value) => {
        if (value === "description" || value === "name")
          {
            flag2 = flag2 || !business.place_info[`${value}_new`];
            flag1 = flag1 && business.place_info[value] === business.place_info[`${value}_new`];
          }
        else
        {
          if(value !== "is_active")
          {
            flag2 =  flag2 || !business[`${value}_new`];
          }
          flag1 = flag1 && business[value] === business[`${value}_new`];
        } 
      });
    return flag1 || flag2;
  };

  handleOpenLocation = address =>
  {
    this.setState({ address });
  };

  handleCloseLocationModal = ()=>
  {
    this.setState({ address: {} });
  };

  render() {
    const { businesses, address, loading } = this.state;

    if(loading) return (
      <div className="card m-auto">
        <h5 className="card-header">Businesses</h5>
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
        <h5 className="card-header">Businesses</h5>
        <div className="card-body">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Opening Hours</th>
                <th>Opening Closing</th>
                <th className="text-center">Approved by Admin</th>
                <th className="text-center">Location</th>
                <th>Active</th>
                <th className="text-center">Save</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {businesses &&
                businesses.map((business, index) => <BusinessRaw
                  business={business}
                  handleOnChangeBusiness={this.handleOnChangeBusiness}
                  handleOnClickSaveBusiness={this.handleOnClickSaveBusiness}
                  index={index}
                  isBusinessDisabled={this.isBusinessDisabled}
                  handleDeleteBusiness={this.handleDeleteBusiness}
                  handleOpenLocation={this.handleOpenLocation}
                  key={business.place_id}                 
                /> )}
            </tbody>
          </table>
        </div>
      </div>
      <BusinessAddressModal
        closeModal={this.handleCloseLocationModal}
        address={address}
       />
      </React.Fragment>
    );
  }
}

export default ListOfBusiness;
