import React from 'react';
import "../../routes/admin/users/UserModal.css"

const NoResults = ({ noResults, handleClose }) =>
{
  if(!noResults) return null;

  const modal = React.useRef(null);

  const handleCloseFromOutSite = event =>
  {
    if(event.target === modal.current) handleClose();
  };

    return (<div onClick={e => {handleCloseFromOutSite(e)}} ref={modal} className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">No results</h5>
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
            <span>Your search did not match any places.</span> 
            <br />
            <span>Please try another categories.</span>   
          </b>       
        </div>
        <div className="modal-footer">
                <button 
                    type="button" 
                    className="btn btn-secondary float-right"
                    onClick={handleClose}
               >
                    Close
                 </button>
        </div>
    </div>
  </div>
</div>);
};

export default NoResults;