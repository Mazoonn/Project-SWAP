import React, { Component } from "react";
//import ReactModalLogin from "react-modal-login";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import { setUserSession } from "../Utils/Common";
import { facebookConfig, googleConfig } from "../config.json";

class LoginGoF extends Component {
  render() {
    const responseFacebook = (response) => {
      setUserSession(response.accessToken, response.profileObj.email);
    };

    const responseGoogle = (response) => {
      console.log(response);
      setUserSession(response.accessToken, response.profileObj.email);
    };

    return (
      <div className="App text-center">
        <FacebookLogin
          cssClass="btn btn-primary btn-lg"
          appId={facebookConfig.appId}
          fields="name,email,picture"
          buttonText="LOGIN WITH Facebock"
          callback={responseFacebook}
        />
        <br />
        <br />
        <GoogleLogin
          style="btn-primary btn-lg"
          clientId={googleConfig.client_id}
          buttonText="LOGIN WITH Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default LoginGoF;
