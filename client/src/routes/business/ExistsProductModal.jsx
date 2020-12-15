import React from 'react';

const ExistsProductModal = ({ name, isActive, handleClose }) =>
{
  const modal = React.useRef(null);

  const handleCloseFromOutSite = event =>
  {
    if(modal.current === event.target) handleClose();
  };

  if(!isActive) return null;

    return (<div onClick={handleCloseFromOutSite} ref={modal} className="user-modal modal" tabIndex="-1">
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
                <span>There is product a with that name - <span className="text-danger"><b>{name}</b></span></span>
                <br/>
                <span>Please try another name</span>   
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

export default ExistsProductModal;