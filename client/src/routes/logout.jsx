import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.clear();
    window.location = "/";
    window.location.reload();
  }
  render() {
    return null;
  }
}

export default Logout;
