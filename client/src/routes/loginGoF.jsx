import React, { Component } from "react";
//import ReactModalLogin from "react-modal-login";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import { setUserSession } from "../Utils/Common";
import { facebookConfig, googleConfig } from "../config.json";

class LoginGoF extends Component {
  render() {
    const responseFacebook = (response) => {
      setUserSession(response.accessToken, response.email);
    };

    const responseGoogle = (response) => {
      setUserSession(response.accessToken, response.email);
    };

    return (
      <div className="App">
        <FacebookLogin
          appId={facebookConfig.appId}
          fields="name,email,picture"
          callback={responseFacebook}
        />
        <br />
        <br />
        <GoogleLogin
          clientId={googleConfig.client_id}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default LoginGoF;
