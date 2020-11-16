import React, { Component } from "react";
import BusinessButtons from "./businessButtons";
import { getAllBusiness, changeActiveBusiness } from "../../services/Business";
import BusinessForm from "./businessForm";
import ListOfProducts from "./ListOfProducts";
import ListOfBusiness from "./ListOfBusiness";

class BusinessPage extends Component {
  state = {
    business: [],
    index_business_id: "",
    //TODO get the id from the login
    business_owner_id: "client_M8PSxa14IZo6T",
    isAddBusiness: false,
    isListOfBusiness: false,
    isProducts: false,
    loading: false,
  };

  handleClickAddBusiness = async () => {
    let isAddBusiness = !this.state.isAddBusiness;
    if (isAddBusiness) {
      this.setState({ isAddBusiness: false });
      await this.handleGetBusiness();
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
        this.setState({ isListOfBusiness: true });
        await this.handleGetBusiness();
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

  changeActiveBusiness = async () => {
    this.setState({ loading: true });
    const request = [];
    for (const business of this.state.business) {
      if (business.is_change) request.push(business);
    }
    await Promise.all(
      request.map((business) => {
        return changeActiveBusiness({ place_id: business.place_id, is_active: business.is_active });
      })
    );
    const business = [...this.state.business];
    business.forEach((business) => {
      business.is_change = false;
    });
    this.setState({ business, loading: false });
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
                changeActiveBusiness={this.changeActiveBusiness}
                isAddBusiness={isAddBusiness}
                loading={loading}
                businesses={business}
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
