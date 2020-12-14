import React, { Component } from "react";
import BusinessButtons from "./businessButtons";
import BusinessForm from "./businessForm";
import ListOfProducts from "./ListOfProducts";
import ListOfBusiness from "./ListOfBusiness";
import { getCurrentUser } from "../../services/authService";

class BusinessPage extends Component {
  state = {
    selected: -1,
    index_business_id: "",
    business_owner_id: "",
    isAddBusiness: false,
    isListOfBusiness: false,
    isProducts: false,
    loading: false,
  };

  data = {
    name: ["Add Business", "My Businesses", "Products"],
    component: [
      <BusinessForm />,
      <ListOfBusiness AreChanges={this.AreChanges} handleOnChangeIsActiveBusiness={this.handleOnChangeIsActiveBusiness} />,
      <ListOfProducts />,
    ],
  };

  componentDidMount() {
    document.title = "Business Page"
    const user = getCurrentUser();
    if (user) {
      this.setState({ business_owner_id: user[`user-id`] });
    }
  }

  handleClickAddBusiness = async () => {
    let isAddBusiness = !this.state.isAddBusiness;
    if (isAddBusiness) {
      this.setState({ isAddBusiness: false });
    }
    this.setState({ isAddBusiness });
  };

  handleOnChangeIsActiveBusiness = (index) => {
    const businesses = [...this.state.business];
    const business = businesses[index];
    business.is_active = !business.is_active;
    business.is_change = business.is_change === undefined ? true : !business.is_change;
    this.setState({ businesses });
  };

  AreChanges = () => {
    let result = false;
    result = this.state.business.some((business) => (business.is_change === undefined ? false : business.is_change));
    return result;
  };

  handleClick = (index) => {
    const selected = this.state.selected !== index ? index : -1;
    this.setState({ selected });
  };

  render() {
    const { isAddBusiness, loading, business, business_owner_id, isProducts: isListOfProducts, isListOfBusiness } = this.state;
    const { selected } = this.state;
    const { name, component } = this.data;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <BusinessButtons handleClick={this.handleClick} data={name} selected={selected} />
          </div>

          <div className="col">
            {selected !== -1  && component[selected] || <div className="card m-auto">
              <h5 className="card-header">Business Owner Page Information</h5>
              <div className="card-body">
                <h6>Add Business</h6>
                <br />
                <br />
                <h6>My Business</h6>
                <br />
                <br />
                <h6>Products</h6>
                <br />
                <br />
              </div>
            </div>}
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default BusinessPage;
