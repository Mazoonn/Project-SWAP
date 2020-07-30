import React, { Component } from "react";
import { clientRegister } from "../services/client";
import { setUserSession, getUser } from "../Utils/Common";
import Joi from "joi-browser";

class RegisterForm extends Component {
  state = {
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      birthday: "",
      sex: "male",
    },
    errors: {},
    loading: false,
  };

  schema = {
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    phone: Joi.number().label("Phone"),
  };

  handleChange = (event) => {
    const user = { ...this.state.user };
    user[event.target.id] = event.target.value;
    this.setState({ user });
  };

  validate = (user) => {
    const newUser = { ...user };
    const valuesToDelete = ["confirm_password", "sex", "birthday"];

    for (const value of valuesToDelete) delete newUser[value];
    const { error } = Joi.validate(newUser, this.schema, {
      abortEarly: false,
    });
    if (!error && user.password === user.confirm_password) return null;

    const errorsState = {};
    if (error) {
      for (let item of error.details) errorsState[item.path[0]] = item.message;
    }
    if (user.password !== user.confirm_password && !errorsState.password)
      errorsState["confirm_password"] =
        "Password and confirm password do not match";

    return errorsState;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const user = { ...this.state.user };
    delete user.confirm_password;

    const errorsState = this.validate(this.state.user);
    this.setState((errorsState && { errors: errorsState }) || { errors: {} });
    if (errorsState) return;
    this.setState({ loading: true });
    try {
      const token = await clientRegister(user);
      setUserSession(token.data, user.email);
      window.location = "/";
    } catch (error) {
      this.setState({ loading: false });
      if (
        error.response &&
        (error.response.status >= 400 || error.response.status <= 500)
      )
        this.setState({ errors: { server: error.response.data } });
    }
  };

  render() {
    if (getUser()) {
      this.props.history.push("/");
    }
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              autoFocus
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.state.user.first_name}
            />
            {this.state.errors.first_name && (
              <div className="alert alert-danger text-center">
                <small>{this.state.errors.first_name}</small>
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.user.last_name}
            />
            {this.state.errors.last_name && (
              <div className="alert alert-danger text-center">
                <small>{this.state.errors.last_name}</small>
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.user.email}
            />
            {this.state.errors.email && (
              <div className="alert alert-danger text-center">
                <small>{this.state.errors.email}</small>
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.user.password}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger text-center">
                <small>{this.state.errors.password}</small>
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="confirm_password">Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="Confirm password"
              onChange={this.handleChange}
              value={this.state.user.confirm_password}
            />
            {this.state.errors.confirm_password && (
              <div className="alert alert-danger text-center">
                <small>{this.state.errors.confirm_password}</small>
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="+XXX-XXX-XXXX"
              onChange={this.handleChange}
              value={this.state.user.phone}
            />
            {this.state.errors.phone && (
              <div className="alert alert-danger text-center">
                <small>{this.state.errors.phone}</small>
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              onChange={this.handleChange}
              value={this.state.user.birthday}
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

        <div className="text-center">
          {this.state.errors.server && (
            <div className="alert alert-danger d-inline-block">
              <small>{this.state.errors.server}</small>
            </div>
          )}
          <br />
          <button
            type="submit"
            disabled={
              this.state.loading ||
              Object.values(this.state.user).some((attr) => attr === "")
            }
            onClick={this.handleSubmit}
            className="btn btn-primary mt-4"
            value={this.state.loading ? "Loading..." : "Login"}
          >
            {this.state.loading ? "Sign up..." : "Sign up"}
          </button>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
