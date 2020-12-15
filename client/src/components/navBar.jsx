import React, { Component } from "react";
import Login from "../routes/login";
import Register from "../routes/register";
import Admin from "../routes/admin/AdminPage";
import Business from "../routes/business/businessPage";
import Profile from "../routes/profile/profile";
import Home from "../routes/HomePage";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Quest from "./quest/quest";
import ClientRoute from "./../Utils/ClientRoute";
import Logout from "./../routes/logout";
import AdminRoute from "./../Utils/AdminRoute";
import BusinessRoute from "../Utils/BusinessRoute";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav id="navbar">
        <BrowserRouter>
          <div>
            <div className="header">
            <h3 id="head-text" className="d-inline text-primary">Smart Walk</h3>
              <NavLink exact activeClassName="active font-weight-bold" to="/">
                Home
              </NavLink>
              {!user && (
                <React.Fragment>
                  <NavLink exact activeClassName="active font-weight-bold" to="/login">
                    Login
                  </NavLink>
                  <NavLink exact activeClassName="active font-weight-bold" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink exact activeClassName="active font-weight-bold" to="/quest">
                    Quest
                  </NavLink>
                  <NavLink exact activeClassName="active font-weight-bold" to="/profile">
                    Profile
                  </NavLink>
                </React.Fragment>
              )}
              {user && (user["role"] === "business" || user["role"] === "admin") && (
                <NavLink exact activeClassName="active font-weight-bold" to="/business">
                  Business Owner
                </NavLink>
              )}
              {user && user["role"] === "admin" && (
                <NavLink exact activeClassName="active font-weight-bold" to="/admin">
                  Admin
                </NavLink>
              )}
              {user && <NavLink exact activeClassName="active font-weight-bold" to="/logout">
                Logout
              </NavLink>}
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <ClientRoute exact path="/quest" component={Quest} />
                <ClientRoute exact path="/profile" component={Profile} />
                <BusinessRoute exact path="/business" component={Business} />
                <AdminRoute exact path="/admin" component={Admin} />
                <ClientRoute exact path="/logout" component={Logout} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </nav>
    );
  }
}

export default NavBar;
