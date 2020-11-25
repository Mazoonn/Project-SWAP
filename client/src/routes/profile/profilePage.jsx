import React, { Component } from "react";
import Buttons from "./profileButtons";

const data = {
  name: ["Info", "Quests", "Become Business Owner"],
  component: [<div></div>, <div></div>, <div></div>],
};

class profilePage extends Component {
  state = {
    selected: -1,
  };

  handleClick = (index) => {
    const selected = this.state.selected !== index ? index : -1;
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    const { name, component } = data;

    return (
      <React.Fragment>
        <div className="row ml-2">
          <div className="col-">
            <Buttons handleClick={this.handleClick} data={name} selected={selected} />
          </div>
          <div className="col">{selected !== -1 && component[selected]}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default profilePage;
