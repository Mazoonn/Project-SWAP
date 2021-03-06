import React from 'react';
import "../admin/users/UserModal.css";


//User birthday modal
const UserBirthdayModal = ({ allowModal, handleClose, birthday, onChange, isDateChanges, isUpdating, handleSaveDate })=>
{

    if(!allowModal) return null;
    
    return (   
    <div className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Birthday</h5>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            aria-label="Close"
            onClick={handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
            <div className="container">
            <div className="row">
                <label className="col col-lg-2" htmlFor="date">
                    <b>Date</b>
                </label>
                <div className="col">
                    <input onChange={onChange} value={birthday} id="date" placeholder="Enter date" className="form-control" type="date"/>
                </div>
            </div>
            </div>
        </div>
        <div className="modal-footer">
        <button
          onClick={handleSaveDate} 
          disabled={!isDateChanges() || isUpdating} 
          className="btn btn-primary">
            {!isUpdating && "Save" ||(<React.Fragment>
              <span className="spinner-grow spinner-grow-sm"></span>
                <span> Loading...</span>
                </React.Fragment>)}
        </button>
          <button 
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>);

}

export default UserBirthdayModal;