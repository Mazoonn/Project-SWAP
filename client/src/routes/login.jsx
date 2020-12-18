import React, { useState } from "react";
import { setUserSession } from "../Utils/Common";
import LoginGoF from "./loginGoF";
import { clientLogin } from "../services/client.ts";
import Joi from "joi-browser";
import { getCurrentUser } from "../services/authService";
import "./profile/widthFit.css"

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  React.useEffect(() => 
  {
    document.title = "Login";
  }, []);

  const validate = () => {
    const { error } = Joi.validate(user, schema, { abortEarly: false });
    if (!error) return null;

    const errorsState = {};
    for (const item of error.details) errorsState[item.path[0]] = item.message;
    return errorsState;
  };

  const failureGoogle = () =>
  {
    setErrors({ server: "Sorry google authentication failed" });
  };

  const handleOnChange = (e) => {
    const userDetails = { ...user };
    userDetails[e.target.name] = e.target.value;
    setUser(userDetails);
  };

  // handle button click of login form
  const handleLogin = async (e) => {
    e.preventDefault();
    const errorsState = validate();
    setErrors(errorsState || {});
    if (errorsState) return;
    setLoading(true);
    try {
      const token = await clientLogin({
        email: user.email,
        password: user.password,
        platform: "local",
      });
      setUserSession(token.data, user.email);
      window.location = "/";
    } catch (error) {
      if (error.response && (error.response.status >= 400 || error.response.status < 500))
        setErrors({ server: error.response.data });
    }
    finally
    {
      setLoading(false);
    }
  };
  if (getCurrentUser()) {
    props.history.push("/");
    return null;
  }
  return (
    <div className="card m-auto fit-content">
    <h5 className="card-header">Login</h5>
    <div className="card-body">
    <div className="text-center">
      <div className="d-inline-block pt-4">
        <LoginGoF loading={setLoading} isDisabled={loading} onFailure = {failureGoogle} />
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="text-left" style={{ width: "280px" }}>
              Email address
              <input
                autoFocus
                value={user.email}
                onChange={handleOnChange}
                name="email"
                type="email"
                className="form-control w-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {errors.email && (
                <div className="alert alert-danger text-center">
                  <small>{errors.email}</small>
                </div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="text-left" style={{ width: "280px" }}>
              Password
              <input
                autocomplete="on"
                value={user.password}
                onChange={handleOnChange}
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              {errors.password && (
                <div className="alert alert-danger text-center">
                  <small>{errors.password}</small>
                </div>
              )}
            </label>
          </div>
          {(errors.server) && (
            <div className="alert alert-danger">
              <small>{errors.server}</small>
            </div>
          )}
          <button
            type="submit"
            onClick={handleLogin}
            disabled={loading || Object.values(user).some((attr) => !attr)}
            className="btn btn-primary"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}

export default Login;
