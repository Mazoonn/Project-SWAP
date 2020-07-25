import React, { Component } from "react";
import Login from "../routes/login";
import Register from "../routes/register";
import Admin from "../routes/admin/AdminPage";
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
              <NavLink activeClassName="active" to="/register">
                Register
              </NavLink>
              <NavLink activeClassName="active" to="/quest">
                Quest
              </NavLink>
              <NavLink activeClassName="active" to="/admin">
                Admin-Page
              </NavLink>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route path="/quest" component={Quest} />
                <PrivateRoute path="/admin" component={Admin} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </nav>
    );
  }
}

export default NavBar;
