import React, { Component } from "react";

class SubCategory extends Component {
  // handleDivide = () => {
  //   let size = Math.ceil(
  //     this.props.category.subCategory.length / this.props.columns
  //   );
  //   let rows = [];

  //   for (var i = 0; i < size; i++) {
  //     let slice = this.props.category.subCategory.slice(
  //       i * this.props.columns,
  //       (i + 1) * this.props.columns
  //     );

  //     rows[i] = (
  //       <tr>
  //         {slice.map((sub) => {
  //           let className = "btn btn-outline-info btn-sm";
  //           if (sub.isSelected) className = className + " active";
  //           return (
  //             <td className="text-center">
  //               <button
  //                 key={sub.sub_id}
  //                 onClick={() => {
  //                   this.props.clickSubCategory(
  //                     this.props.category.id,
  //                     sub.sub_id
  //                   );
  //                 }}
  //                 type="button"
  //                 className={className}
  //               >
  //                 {sub.sub_name}
  //               </button>
  //             </td>
  //           );
  //         })}
  //         {slice.length !== this.props.columns && (
  //           <td colSpan={this.props.columns - slice.length}></td>
  //         )}
  //       </tr>
  //     );
  //   }
  //   return rows;
  // };
  render() {
    return (
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body text-center">
          <div className="card-title">{this.props.category.name}</div>
          <div className="card-text">
            {/* <table className="table-sm table-bordered m-auto">
              <tbody>{this.handleDivide()}</tbody>
            </table> */}
            <div className="container">
              <div className={`row row-cols-${this.props.columns}`}>
                {this.props.category.subCategory.map((sub) => {
                  let className = "btn btn-outline-info btn-sm";
                  if (sub.isSelected) className = className + " active";
                  return (
                    <div key={sub.sub_id} className="col">
                      <button
                        key={sub.sub_id}
                        onClick={() => {
                          this.props.clickSubCategory(
                            this.props.category.id,
                            sub.sub_id
                          );
                        }}
                        type="button"
                        className={className}
                      >
                        {sub.sub_name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubCategory;
