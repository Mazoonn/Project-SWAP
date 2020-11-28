import React from 'react';
import "../users/UserModal.css"

const EventDescriptionModal = ({ event, handleExitModal, handleOnChange, handleEditDescription, loading })=>
{
    if(Object.keys(event).length === 0) return null; 
    const { description, description_new } = event;

 return (   
    <div className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Description</h5>
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
            <div>
                <textarea 
                    className="form-control"
                    name="description"
                    rows="4"
                    value={description_new}
                    onChange={handleOnChange}
                />
            </div>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-primary"
            disabled={!description_new || (description_new === description) || loading }
            onClick={()=>{handleEditDescription(event)}}
          >
            {loading && (<React.Fragment>
                            <span className="spinner-grow spinner-grow-sm">
                                </span> Loading...
                         </React.Fragment>) || <span>Save</span>}
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

export default EventDescriptionModal;