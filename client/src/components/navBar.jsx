import React, { Component } from "react";
import Login from "./login/login";
import Dashboard from "../routes/dashboard";
import Home from "../routes/HomePage";
import LoginGoR from "./login/loginGoF";

import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav id="navbar">
        <h3 id="head-text">Smart Walk</h3>
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
              <small>(Access without token only)</small>
              <NavLink activeClassName="active" to="/dashboard">
                Dashboard
              </NavLink>
              <small>(Access with token only)</small>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
        <h3
          tabIndex="0"
          className="transition menu-text"
          title={this.props.menuText + " Sidebar"}
          onClick={() => {
            this.props.toggleSideBar();
          }}
          onKeyPress={this.props.menuKeyEnter}
        >
          {this.props.sidebarOpen ? (
            <i className="material-icons" style={{ lineHeight: "inherit" }}>
              clear
            </i>
          ) : (
            <i className="material-icons" style={{ lineHeight: "inherit" }}>
              menu
            </i>
          )}
        </h3>
        <LoginGoR />
      </nav>
    );
  }
}

export default NavBar;
