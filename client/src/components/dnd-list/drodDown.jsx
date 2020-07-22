import React, { Component } from "react";

class DropDown extends Component {
  state = { toggle: false };
  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    return (
      <div
        className="d-inline-block position-absolute m-2"
        style={{ zIndex: 2 }}
      >
        <button
          onClick={this.handleToggle}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Route
        </button>
        <div
          className={`p-2 border rounded ${
            this.state.toggle === false ? "d-none" : ""
          }`}
          style={{ background: "white" }}
        >
          <form>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="car"
                  name="transport"
                  className="mr-2"
                />
                Car
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="bicycle"
                  name="transport"
                  className="mr-2"
                />
                Bicycle
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="walk"
                  name="transport"
                  className="mr-2"
                />
                Walk
              </label>
            </div>
            <div className="border-top">
              <label className="pt-2">
                <input
                  type="number"
                  step={0.5}
                  name="hours"
                  min="0"
                  max="10"
                  className="w-25 mr-2"
                />
                Hours of the trip
              </label>
            </div>
          </form>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DropDown;
