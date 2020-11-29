import React from 'react';
import "../users/UserModal.css"
import SearchLocationInput from './searchLocation';
import "./pacContainer.css"

const isAddButtonDisabled = event =>
{
  const { name, description, start_date, end_date, price, place } = event;
  if(start_date === "" || end_date === "") return true;
  const start_date_time = new Date(start_date).getTime();
  return (name === "" || description === "" ||
  (start_date_time >= new Date(end_date).getTime()) ||
  price === "" || (price == 0) || Object.keys(place).length === 0);
};

const AddEventModal = ({ event, handleExitModal, setAddress, handleOnChange, clickOnSave, loading })=>
{

    if(!event.isActive) return null;
    const { name, description, start_date, end_date, price, errors } = event;


 return (   
    <div className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Event</h5>
          <button 
            onClick={handleExitModal} 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            aria-label="Close"
            disabled={loading}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="w-100">
            <tbody>
            <tr>
              <td className="pb-2 pt-2">Name:</td>
              <td className="pb-2 pt-2">
                <input 
                    onChange={e=>{handleOnChange(e)}}
                    disabled={loading}
                    value={name}
                    type="text"
                    name="name" 
                    className="form-control"
                    placeholder="Name"
                />
              </td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Address:</td>
              <td className="pb-2 pt-2">
                  <SearchLocationInput      
                    setAddress={setAddress}
                    error = {errors.address}
                    disabled={loading} 
                  />
              </td>
            </tr>
            <tr>
              <td className="pb-2 pt-2 align-top pr-2">Description:</td>
              <td className="pb-2 pt-2">
              <textarea
                    onChange={e=>{handleOnChange(e)}} 
                    value={description}
                    disabled={loading}
                    className="form-control" 
                    name="description" 
                    rows={4}
                    cols={50}
                    style={{ resize:"none" }}
                    placeholder="Description"
                >      
                </textarea>
              </td>
            </tr>
            <tr>
                <td className="pb-2 pt-2">Start Date:</td>
                <td className="pb-2 pt-2">
                    <input 
                      onChange={e=>{handleOnChange(e)}}
                      value={start_date}
                      disabled={loading}
                      type="datetime-local" 
                      className="form-control"
                      name="start_date"
                    />
                </td>
            </tr>
            <tr>
              <td 
                className="pb-2 pt-2"
              >End Date:</td>
              <td className="pb-2 pt-2">
                <input 
                  disabled={loading}
                  onChange={e=>{handleOnChange(e)}}
                  value={end_date}
                  name="end_date"
                  type="datetime-local" 
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Price:</td>
              <td className="pb-2 pt-2">
              <input
                  disabled={loading}
                  onChange={e=>{handleOnChange(e)}}
                  value={price}
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="$"
                  required
                  className="form-control w-50"
              />
              </td>
            </tr>
            </tbody>                   
          </table>
        </div>
        <div className="modal-footer">
          <button 
            type="button"  
            className="btn btn-primary"
            disabled={isAddButtonDisabled(event) || loading}
            onClick={clickOnSave}
          >
            {loading && (<React.Fragment>
                            <span className="spinner-grow spinner-grow-sm">
                                </span> Loading...
                            </React.Fragment>) || <span>Add</span>}
          </button>
          <button 
            onClick={handleExitModal} 
            type="button" 
            className="btn btn-secondary"
            disabled={loading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
 );
}

export default AddEventModal;