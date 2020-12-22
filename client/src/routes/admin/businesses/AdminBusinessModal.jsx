import React from 'react';
import "../users/UserModal.css"

//Get days from date
function getDays(date){
    if(!date || date === "") return "";
    const now = new Date();
    const birthday = new Date(date);
    const diff = now.getTime() - birthday.getTime();
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`;
}


//Business information modal
const BusinessModal = ({business, handleExitModal})=>
{
    const values = Object.values(business)
    if(values.length === 0)
     return null;

 return (   
    <div className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Business</h5>
          <button onClick={handleExitModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="w-100">
            <tbody>
            <tr>
              <td className="pb-2 pt-2">Business name:</td>
              <td className="pb-2 pt-2">{business["name"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Request Date:</td>
              <td className="pb-2 pt-2">{getDays(business["creation_date"])}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Country:</td>
              <td className="pb-2 pt-2">{business["country"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Settlement:</td>
              <td className="pb-2 pt-2">{business["settlement"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Street:</td>
              <td className="pb-2 pt-2">{business["street"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Street Number:</td>
              <td className="pb-2 pt-2">{business["street_number"]}</td>
            </tr>                 
            </tbody>                   
          </table>
        </div>
        <div className="modal-footer">
          <button onClick={handleExitModal} type="button" className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
 );
}

export default BusinessModal;