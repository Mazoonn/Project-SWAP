import React, { useState } from "react";
import { setUserSession } from "../Utils/Common";
import LoginGoF from "./loginGoF";
import { clientLogin } from "../services/client";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const user_email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setLoading(true);
    try {
      const response = clientLogin({
        email: user_email.value,
        password: password.value,
      });
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push("/Map");
    } catch (error) {
      console.log(error);
      // setLoading(false);
      // if (error.response.status === 401) setError(error.response.data.message);
      // else setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <LoginGoF />
      <br />
      <div className="border-0">
        <form className="text-center">
          <div class="form-group">
            <label for="exampleInputEmail1">
              {" "}
              Email address
              <input
                {...user_email}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </label>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">
              Password
              <input
                {...password}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            value={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
            class="btn btn-primary"
          >
            Login
          </button>
          {error && (
            <>
              <small style={{ color: "red" }}>{error}</small>
              <br />
            </>
          )}
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
