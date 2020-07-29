import React, { useState } from "react";
import { setUserSession, getUser } from "../Utils/Common";
import LoginGoF from "./loginGoF";
import { clientLogin } from "../services/client";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const user_email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = await clientLogin({
        email: user_email.value,
        password: password.value,
        platform: "local",
      });
      setUserSession(token.data, user_email.value);
      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      if (
        error.response &&
        (error.response.status >= 400 || error.response.status <= 500)
      )
        setError(error.response.data);
      // else setError("Something went wrong. Please try again later.");
    }
  };
  if (getUser()) {
    window.location = "/";
  }
  return (
    <div className="text-center pt-4">
      <LoginGoF />
      <br />
      <div className=" d-inline-block">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="text-left">
              Email address
              <input
                {...user_email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="text-left">
              Password
              <input
                {...password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </label>
          </div>
          {error && (
            <div className="alert alert-danger">
              <small>{error}</small>
            </div>
          )}
          <button
            type="submit"
            value={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
