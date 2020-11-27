import React, { Component } from "react";
import AdminCategories from "./adminCategories";
import AdminButtons from "./adminButtons";
import AdminSubCategories from "./AdminSubCategories";
import UsersManager from './users/UsersManager';
import AdminBusinesses from './businesses/AdminBusinesses';
import AdminEvents from './events/Events';

const data = {
name: ["Categories", "Sub Categories", "Manage Users", "Businesses", "Events"],
component: [<AdminCategories />, <AdminSubCategories />, <UsersManager />,<AdminBusinesses />, <AdminEvents/> ]
} 

class AdminPage extends Component {
  state = {
    selected: -1
  };

  handleClick = (index) => 
  {
    const selected = this.state.selected !== index ? index : -1;
    this.setState({selected});
  };

  render() {
    const { selected } = this.state;
    const { name, component} = data;

    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <AdminButtons
              handleClick= {this.handleClick}
              data={name}
              selected={selected}
            />
          </div>
          <div className="col">
            {
              (selected !== -1) && component[selected]
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
