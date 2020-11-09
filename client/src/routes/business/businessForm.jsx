import React, { Component } from "react";

class businessForm extends Component {
  constructor(props) {
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <form>
          <div class="form-row">
            <div className="col">
              <input type="text" className="form-control" placeholder="" />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="" />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default businessForm;
