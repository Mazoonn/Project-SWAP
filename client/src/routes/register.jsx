import React, { useState } from "react";
import { clientRegister, clientLogin } from "../services/client";
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sex: "male" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.getAttribute("id")]: String(event.target.value),
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await clientRegister(this.state);
      if (!response) throw ErrorEvent("There was an error with the server");
      //TODO fix login automattic
    } catch (error) {
      throw error.response.data.message;
    }
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
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="+XXX-XXX-XXXX"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              className="form-control"
              onBlur={this.handleChange}
            >
              <option value="male" defaultValue>
                Male
              </option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-group col-md-6">
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-primary"
            value={this.loading ? "Loading..." : "Login"}
          >
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
