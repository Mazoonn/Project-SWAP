import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { clientLogin } from "../services/client.ts";
import { setUserSession } from "../Utils/Common";
import { googleConfig } from "../config.json";


//Login with google
class LoginGoF extends Component {
  render() {

    //Login with google handler
    const responseGoogle = async (response) => {
      const { email, givenName, familyName, googleId } = response.profileObj;
      this.props.loading(true);
      const token = await clientLogin({
        email: email,
        platform: "google",
        first_name: givenName,
        last_name: familyName,
        user_id: googleId,
      });
      setUserSession(token.data, email);
      window.location = "/";
    };

    return (
      <div className="App text-center">
        <GoogleLogin
          disabled={this.props.isDisabled}
          className="btn-primary btn-lg"
          clientId={googleConfig.client_id}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={this.props.onFailure}
        />
      </div>
    );
  }
}

export default LoginGoF;
