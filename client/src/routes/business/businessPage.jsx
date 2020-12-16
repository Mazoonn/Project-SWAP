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
      <ListOfBusiness />,
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

  handleClick = (index) => {
    const selected = this.state.selected !== index ? index : -1;
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    const { name, component } = this.data;
    return (
      <React.Fragment>
        <div className="row ml-2">
          <div>
            <BusinessButtons handleClick={this.handleClick} data={name} selected={selected} />
          </div>

          <div className="col">
            {selected !== -1  && component[selected] || <div className="card m-auto">
              <h5 className="card-header">Business owner page information</h5>
              <div className="card-body">
                <p>
                  <span>Join our application so we can find you and recommend you to our seekers.</span>
                  <br/>
                  <span>Once you joined us please add your accurate info to be best categorized.</span>
                  <br/>
                  <span>After you have added all the info we will approve your business.</span>
                  <br/>
                  <span>You can add your products for our seekers to get more engaged</span>
                  <br/>
                  <span>You will be happily looked for by our seekers.</span>
                </p>
              </div>
            </div>}
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default BusinessPage;
