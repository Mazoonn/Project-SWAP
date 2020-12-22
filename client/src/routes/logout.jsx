import { Component } from "react";

//Logout from the application just clear the local storage and redirect to home page
class Logout extends Component {
  componentDidMount() {
    localStorage.clear();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
