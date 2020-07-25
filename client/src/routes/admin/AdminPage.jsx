import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import PrivateRoute from "../../Utils/PrivateRoute";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Settings from "./Setting";
class AdminPage extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <ProSidebar>
          <Menu iconShape="round">
            <MenuItem>
              Settings
              <Link to="/admin/Settings" />
            </MenuItem>
            <MenuItem>
              Handel Admin's
              <Link to="/admin/AdminSettings" />
            </MenuItem>
            <MenuItem>
              Handel Clients
              <Link to="/admin/AdminClients" />
            </MenuItem>
            <MenuItem>
              Handel Categories
              <Link to="/admin/AdminClients" />
            </MenuItem>
            <MenuItem>
              Handel Places
              <Link to="/admin/AdminPlaces" />
            </MenuItem>
          </Menu>
        </ProSidebar>
        <div className="content">
          <Switch>
            <PrivateRoute path="/admin/Settings" component={Settings} />
            <PrivateRoute path="/admin/AdminSettings" component={Settings} />
            <PrivateRoute path="/admin/AdminClients" component={Settings} />
            <PrivateRoute path="/admin/AdminPlaces" component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AdminPage;
