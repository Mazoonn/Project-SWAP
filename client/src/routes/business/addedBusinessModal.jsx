import React from 'react';
import "../admin/users/UserModal.css"

//Added business modal
const AddedBusinessModal = ({ isOpen, handleClose, error }) =>
{
    const modal = React.useRef(null);

    const handleCloseFromOutSite = event =>
    {       
        if(event.target === modal.current) handleClose();
    };

    if(!isOpen) return null;

    return (   
        <div onClick={handleCloseFromOutSite} ref={modal} className="user-modal modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Business</h5>
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
                <b>
                    <span>{!error && "Your business request added successfully." ||
                    <React.Fragment>
                      <span>There is a business that is located in this address.</span>
                      <br/>
                      <span>Please try another address.</span>
                    </React.Fragment>
                    }</span>   
                </b>  
            </div>
            <div className="modal-footer">
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
};

export default AddedBusinessModal;