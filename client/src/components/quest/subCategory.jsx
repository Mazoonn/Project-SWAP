import React, { Component } from "react";

//Subcategory component
class SubCategory extends Component {
  render() {
    return (
      <div className="col">
        <div className="card h-100">
        <h6 className="card-header text-center">{this.props.category.name}</h6>
          <div className="card-body text-center">
            <div className="card-text">
              <div className="container">
                <div className={`row row-cols-${this.props.columns}`}>
                  {this.props.category.subCategory.map((sub) => {
                    let className = "btn btn-outline-primary btn-sm";
                    if (sub.isSelected) className = className + " active";
                    return (
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubCategory;
