import React, { Component } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "../../routes/admin/AdminPage.css";
import PrivateRoute from "../../Utils/PrivateRoute";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import AdminSettings from "./Setting";
class AdminPage extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div id="wrapper" class="toggled">
          <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
              <li>
                <NavLink exact activeClassName="active" to="/Category">
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/Settings">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/Clients">
                  Clients
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/Quest">
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="c-div">
            <Switch>
              <PrivateRoute path="/Category" component={{}} />
              <PrivateRoute path="/Settings" component={AdminSettings} />
              <PrivateRoute path="/Clients" component={{}} />
              <PrivateRoute path="/Quest" component={{}} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default AdminPage;
