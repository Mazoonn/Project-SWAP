import React, { Component } from "react";
import Login from "../routes/login";
import Register from "../routes/register";
import Admin from "../routes/admin/AdminPage";
import Business from "../routes/business/businessPage";
import Profile from "../routes/ProfilePage";
import Home from "../routes/HomePage";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Quest from "./quest/quest";
import PrivateRoute from "./../Utils/PrivateRoute";
import Logout from "./../routes/logout";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav id="navbar">
        <h3 id="head-text">Smart Walk</h3>
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
              {!user && (
                <React.Fragment>
                  <NavLink activeClassName="active" to="/login">
                    Login
                  </NavLink>
                  <NavLink activeClassName="active" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink activeClassName="active" to="/quest">
                    Quest{console.log(user)}
                  </NavLink>
                  <NavLink activeClassName="active" to="/logout">
                    Logout
                  </NavLink>
                  <NavLink activeClassName="active" to="/profile">
                    Profile
                  </NavLink>
                </React.Fragment>
              )}
              {user && ( //TODO user.isBusinessOwner && (
                <NavLink activeClassName="active" to="/business">
                  Business Owner Page
                </NavLink>
              )}
              {user && ( //TODO user.isAdmin && (
                <NavLink activeClassName="active" to="/admin">
                  Admin-Page
                </NavLink>
              )}
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/quest" component={Quest} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/business" component={Business} />
                <PrivateRoute exact path="/admin" component={Admin} />
                <PrivateRoute exact path="/logout" component={Logout} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </nav>
    );
  }
}

export default NavBar;
