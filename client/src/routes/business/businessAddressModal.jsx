import React from 'react';
import "../admin/users/UserModal.css"

const BusinessAddressModal = ({ address, closeModal }) =>
{
    const modal = React.useRef(null);

    const closeModalFromOutSite = event =>
    {
        if(modal.current === event.target) closeModal();
    };

    if(Object.keys(address).length === 0) return null;

    return (<div onClick={closeModalFromOutSite} ref={modal} className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Location</h5>
          <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="w-100">
            <tbody>
            <tr>
              <td className="pb-2 pt-2"><b>Country:</b></td>
              <td className="pb-2 pt-2">{address.country}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Settlement:</b></td>
              <td className="pb-2 pt-2">{address.settlement}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Street:</b></td>
              <td className="pb-2 pt-2">{address.street}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Street Number:</b></td>
              <td className="pb-2 pt-2">{address.street_number}</td>
            </tr>                 
            </tbody>                   
          </table>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} type="button" className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>);
}

export default BusinessAddressModal;