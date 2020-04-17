import React, { Component } from "react";

class SubCategory extends Component {
  category = ["Cafe", "Meat", "Bakery", "1", "2", "3", "4"];

  handleDivide = () => {
    let size = Math.ceil(this.category.length / this.props.rows);
    let rows = [];

    for (var i = 0; i < size; i++) {
      let slice = this.category.slice(i * this.props.rows, (i + 1) * this.props.rows);

      rows[i] = (
        <tr>
          {slice.map((sub) => {
            return (
              <td className="text-center">
                <button type="button" className="btn btn-outline-info btn-sm">
                  {sub}
                </button>
              </td>
            );
          })}
          {slice.length !== this.props.rows && (
            <td colSpan={this.props.rows - slice.length}></td>
          )}
        </tr>
      );
    }
    return rows;
  };
  render() {
    return (
      <table className="table-sm table-bordered">
        <thead>
          <tr>
            <th colSpan={this.props.rows} className="text-center">
              Restaurant
            </th>
          </tr>
        </thead>
        <tbody>{this.handleDivide()}</tbody>
      </table>
    );
  }
}

export default SubCategory;
