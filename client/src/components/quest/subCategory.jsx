import React, { Component } from "react";

class SubCategory extends Component {
  handleDivide = () => {
    let size = Math.ceil(
      this.props.category.subCategory.length / this.props.columns
    );
    let rows = [];

    for (var i = 0; i < size; i++) {
      let slice = this.props.category.subCategory.slice(
        i * this.props.columns,
        (i + 1) * this.props.columns
      );

      rows[i] = (
        <tr>
          {slice.map((sub) => {
            let className = "btn btn-outline-info btn-sm";
            if (sub.isSelected) className = className + " active";
            return (
              <td className="text-center">
                <button
                  onClick={() => {
                    this.props.clickSubCategory(
                      this.props.category.id,
                      sub.id2
                    );
                  }}
                  type="button"
                  className={className}
                >
                  {sub.name}
                </button>
              </td>
            );
          })}
          {slice.length !== this.props.columns && (
            <td colSpan={this.props.columns - slice.length}></td>
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
            <th colSpan={this.props.columns} className="text-center">
              {this.props.category.name}
            </th>
          </tr>
        </thead>
        <tbody>{this.handleDivide()}</tbody>
      </table>
    );
  }
}

export default SubCategory;
