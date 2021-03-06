import React, { Component } from "react";
import AdminCategories from "./adminCategories";
import AdminButtons from "./adminButtons";
import AdminSubCategories from "./AdminSubCategories";
import UsersManager from './users/UsersManager';
import AdminBusinesses from './businesses/AdminBusinesses';
import AdminEvents from './events/Events';


const data = {
name: ["Categories", "Sub Categories", "Manage Users", "Businesses", "Events" ],
component: [<AdminCategories />, <AdminSubCategories />, <UsersManager />,<AdminBusinesses />, <AdminEvents/> ]
} 

//Admin main page
class AdminPage extends Component {
  state = {
    selected: 0
  };

  //Click on the list of button
  handleClick = index => 
  {
    if(this.state.selected !== index) this.setState({ selected: index });
  };

  //Set title
  componentDidMount()
  {
    document.title = "Admin";
  };

  render() {
    const { selected } = this.state;
    const { name, component } = data;

    return (
      <React.Fragment>
        <div className="row ml-2">
          <div>
            <AdminButtons
              handleClick= {this.handleClick}
              data={name}
              selected={selected}
            />
          </div>
          <div className="col">
            {component[selected]}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
