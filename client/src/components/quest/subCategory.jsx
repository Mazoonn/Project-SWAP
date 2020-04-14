import React, { Component } from "react";

class SubCategory extends Component {
  category = ["Cafe", "Meat", "Bakery"];
  render() {
    return (
      <table className="table-sm table-bordered">
        <tr>
          <th colSpan={3} className="text-center">
            Restaurant
          </th>
        </tr>
        <tr>
          {this.category.map((sub) => {
            return (
              <td>
                <button type="button" className="btn btn-outline-info btn-sm">
                  {sub}
                </button>
              </td>
            );
          })}
        </tr>
      </table>
    );
  }
}

export default SubCategory;
