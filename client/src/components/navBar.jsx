import React, { Component } from "react";
import Login from "./login/login";
import Dashboard from "../routes/dashboard";
import Home from "../routes/HomePage";

import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Quest from "./quest/quest";

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
              <NavLink activeClassName="active" to="/quest">
                Quest
              </NavLink>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route path="/quest" component={Quest} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </nav>
    );
  }
}

export default NavBar;
