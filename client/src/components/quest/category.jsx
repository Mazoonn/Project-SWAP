import React, { Component } from "react";

//main category button
class Category extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.categoryList.map((category) => {
          let className = "list-group-item list-group-item-action text-center";
          if (category.isCurrentlySelected) className = className + " active";
          return (
            <button
              type="button"
              className={
                this.props.isLoading ? `${className} disabled` : className
              }
              onClick={() => {
                if (!this.props.isLoading)
                  this.props.handleOnClickCategory(category.id);
              }}
              key={category.id}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    );
  }
}
export default Category;
