import React from "react";

const businessCategories = (props) => {
  if (!props.isCategories) return null;
  return (
    <React.Fragment>
      <h3>Categories</h3>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Google Value</th>
            <th className="text-center">Active</th>
          </tr>
        </thead>
        <tbody>
          {props.categories.map((category, index) => {
            return (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.google_value}</td>
                <td className="text-center">
                  <div>
                    <input
                      onChange={() => {
                        props.handleOnChangeIsActive(index);
                      }}
                      type="checkbox"
                      checked={category.is_active}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center">
        <button
          disabled={!props.AreChanges() || props.loading}
          className="btn btn-primary"
          type="button"
          onClick={props.handlePutCategories}
        >
          {(props.loading && "Loading...") || "Save Changes"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default businessCategories;
