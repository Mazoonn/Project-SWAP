//Not in used
//Can delete it

import React, { useState } from "react";


class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //delete buttons
  }

  render() {
    return (
      <form>
        <div className="form-row ">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              onChange={this.handleClick}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="first_lest">Lest Name</label>
            <input
              type="text"
              className="form-control"
              id="first_lest"
              placeholder="Lest Name"
              onChange={this.handleClick}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={this.handleClick}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handleClick}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="+XXX-XXX-XXXX"
              onChange={this.handleClick}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Setting;
