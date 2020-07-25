import React, { Component } from "react";

class SubCategory extends Component {
  render() {
    return (
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body text-center">
          <div className="card-title">{this.props.category.name}</div>
          <div className="card-text">
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
                          if (!this.props.isLoading)
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
