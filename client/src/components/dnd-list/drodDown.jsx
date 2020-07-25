import React, { Component } from "react";

const getTimeAndDistance = (legs) => {
  let hours, minutes;
  let timeString = "";
  let distanceString = "";
  let seconds = 0;
  let meters = 0;
  legs.forEach((leg) => {
    meters += leg.distance.value;
    seconds += leg.duration.value;
  });
  hours = Math.floor(seconds / 3600);
  minutes = Math.round((seconds % 3600) / 60);
  if (minutes === 60) minutes -= 1;
  seconds >= 3600
    ? (timeString = `${hours}:${("0" + minutes).slice(-2)} hours`)
    : seconds >= 60
    ? (timeString = `${minutes} minutes`)
    : (timeString = `seconds ${seconds}`);
  meters >= 1000
    ? (distanceString = `${Math.round((meters / 1000) * 10) / 10} km`)
    : (distanceString = `${meters} meters`);
  return { timeString, distanceString };
};

class DropDown extends Component {
  state = { toggle: false };
  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    const timeDistanceString =
      this.props.timeDistance !== undefined
        ? getTimeAndDistance(this.props.timeDistance)
        : this.props.timeDistance;
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
        {this.state.toggle && (
          <div
            className="p-3 border rounded shadow"
            style={{ background: "white" }}
          >
            <form>
              {!this.props.isFinished && (
                <div>
                  <div className="radio">
                    <label>
                      <input
                        checked={this.props.radioValue === "walk"}
                        onChange={this.props.handleRadioChange}
                        type="radio"
                        value="walk"
                        name="transport"
                        className="mr-2"
                      />
                      Walk
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        checked={this.props.radioValue === "bicycle"}
                        onChange={this.props.handleRadioChange}
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
                        checked={this.props.radioValue === "car"}
                        onChange={this.props.handleRadioChange}
                        type="radio"
                        value="car"
                        name="transport"
                        className="mr-2"
                      />
                      Car
                    </label>
                  </div>
                </div>
              )}

              {this.props.timeDistance !== undefined && (
                <div
                  className={!this.props.isFinished ? "border-top" : undefined}
                >
                  <label className="pt-2">
                    <span>{`Duration: ${timeDistanceString.distanceString}`}</span>
                    <br />
                    <span>{`Time: ${timeDistanceString.timeString}`}</span>
                  </label>
                </div>
              )}
            </form>

            {!this.props.isFinished && this.props.children}
            {!this.props.isFinished && this.props.timeDistance !== undefined && (
              <div className="text-center  border-top">
                <button
                  onClick={() => {
                    this.props.handleFinish();
                  }}
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DropDown;
