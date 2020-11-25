import React from 'react';
import "../users/UserModal.css"

const DescriptionModal = ({description, handleExitModal})=>
{
    const { isActive, value } = description;
    if(!isActive)
     return null;

 return (   
    <div className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Description</h5>
          <button onClick={handleExitModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
            <div>
                <span>{value}</span>
            </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleExitModal} type="button" className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
 );
}

export default DescriptionModal;