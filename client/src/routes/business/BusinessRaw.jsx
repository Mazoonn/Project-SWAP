import React from 'react';

const BusinessRaw = (
    { 
        handleOnChangeBusiness,
        index,
        business, 
        handleOnClickSaveBusiness,
        isBusinessDisabled,
        handleDeleteBusiness,
        handleOpenLocation
    }) =>
{
    return (<React.Fragment>
        <tr>
          <td>
            <input
              onChange={(event) => {
                handleOnChangeBusiness(event, index);
              }}
              name="name_new"
              type="text"
              className="form-control"
              value={business.place_info[`name_new`]}
            />
          </td>
          <td>
            <input
              onChange={(event) => {
                handleOnChangeBusiness(event, index);
              }}
              name="description_new"
              type="text"
              className="form-control"
              value={business.place_info[`description_new`]}
            />
          </td>
          <td>
            <input
              onChange={(event) => {
                handleOnChangeBusiness(event, index);
              }}
              name="opening_hours_new"
              type="time"
              className="form-control"
              value={business[`opening_hours_new`]}
            />
          </td>
          <td>
            <input
              onChange={(event) => {
                handleOnChangeBusiness(event, index);
              }}
              name="closing_hours_new"
              type="time"
              className="form-control"
              value={business[`closing_hours_new`]}
            />
          </td>
          <td>
            <div>
              <h6 className="text-center">{business.approve_by_admin ? "Yes" : "Pending"}</h6>
            </div>
          </td>
          <td className="text-center">
              <button onClick={()=> {handleOpenLocation(business.place_info)}} className="btn btn-primary btn-sm">Show</button>
          </td>
          <td className="text-center">
            <div>
              <input
                onChange={(event) => {
                  handleOnChangeBusiness(event, index);
                }}
                type="checkbox"
                name="is_active_new"
                checked={business[`is_active_new`]}
              />
            </div>
          </td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {
                handleOnClickSaveBusiness(index);
              }}
              disabled={isBusinessDisabled(index)}
            >
              Save
            </button>
          </td>
          <td className="text-center">
            <button
              onClick={() => {
                handleDeleteBusiness(index);
              }}
              type="button"
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      </React.Fragment>);
};

export default BusinessRaw;