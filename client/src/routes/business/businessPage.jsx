import React, { Component } from "react";
import BusinessButtons from "./businessButtons";
import { getAllBusiness } from "../../services/Business";
import BusinessForm from "./businessForm";
import ListOfProducts from "./ListOfProducts";
import ListOfBusiness from "./ListOfBusiness";
import { getCurrentUser } from "../../services/authService";

class BusinessPage extends Component {
  state = {
    business: [],
    index_business_id: "",
    business_owner_id: "",
    isAddBusiness: false,
    isListOfBusiness: false,
    isProducts: false,
    loading: false,
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (user) {
      this.setState({ business_owner_id: user[`user-id`] });
      this.handleGetBusiness();
    }
  }

  handleClickAddBusiness = async () => {
    let isAddBusiness = !this.state.isAddBusiness;
    if (isAddBusiness) {
      this.setState({ isAddBusiness: false });
    }
    this.setState({ isAddBusiness });
  };

  handleOnSelectButton = async (event) => {
    const indexOfButton = event.target.id;
    this.setState({ index_business_id: event.target.value });
    this.setState({ isAddBusiness: false, isListOfBusiness: false, isProducts: false });
    switch (indexOfButton) {
      case "add business":
        this.setState({ isAddBusiness: true });
        break;
      case "list of business":
        await this.handleGetBusiness();
        this.setState({ isListOfBusiness: true });
        break;
      case "products":
        await this.handleGetBusiness();
        this.setState({ isProducts: true });
        break;
    }
  };

  handleOnChangeIsActiveBusiness = (index) => {
    const businesses = [...this.state.business];
    const business = businesses[index];
    business.is_active = !business.is_active;
    business.is_change = business.is_change === undefined ? true : !business.is_change;
    this.setState({ businesses });
  };

  handleGetBusiness = async () => {
    const business = await getAllBusiness(this.state.business_owner_id);
    this.setState({
      business,
    });
  };

  AreChanges = () => {
    let result = false;
    result = this.state.business.some((business) => (business.is_change === undefined ? false : business.is_change));
    return result;
  };

  render() {
    const { isAddBusiness, loading, business, business_owner_id, isProducts: isListOfProducts, isListOfBusiness } = this.state;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <BusinessButtons
              handleOnSelectButton={this.handleOnSelectButton}
              isAddBusiness={isAddBusiness}
              isProducts={isListOfProducts}
              isListOfBusiness={isListOfBusiness}
            />
          </div>
          <div className="col">
            {isListOfProducts && <ListOfProducts business_owner_id={business_owner_id} business={business} />}
            {isListOfBusiness && (
              <ListOfBusiness
                AreChanges={this.AreChanges}
                handleOnChangeIsActiveBusiness={this.handleOnChangeIsActiveBusiness}
                isAddBusiness={isAddBusiness}
                loading={loading}
                business={business}
                businessOwnerId={business_owner_id}
              />
            )}
            {isAddBusiness && <BusinessForm business_owner_id={business_owner_id} />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessPage;
