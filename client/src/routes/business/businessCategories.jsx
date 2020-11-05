import React from "react";

const BusinessCategories = (props) => {
  if (!props.businesses) return null;
  return (
    <React.Fragment>
      <h3>businesses</h3>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Opening Hours</th>
            <th>Opening Closing</th>
            <th>Rating</th>
            <th>Icon</th>
            <th className="text-center">Active</th>
          </tr>
        </thead>
        <tbody>
          {props.businesses.map((business, index) => {
            return (
              <tr key={business.place_id}>
                <td>{business.name}</td>
                <td>{business.description}</td>
                <td>{business.opening_hours}</td>
                <td>{business.closing_hours}</td>
                <td>{business.description}</td>
                <td>{business.Icon}</td>
                <td className="text-center">
                  <div>
                    <input
                      onChange={() => {
                        props.handleOnChangeIsActive(index);
                      }}
                      type="checkbox"
                      checked={business.is_active}
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
          onClick={props.changeActiveBusiness}
        >
          {(props.loading && "Loading...") || "Save Changes"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default BusinessCategories;
