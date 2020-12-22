import React from 'react';
import "../users/UserModal.css"


const role = {
    admin: "Admin",
    business: "Business Owner",
    client: "Client"
};

const platform =
{
    google: "Google",
    facebook: "Facebook",
    local: "Local",
};

//if date valid return age from date else rerun empty string 
function getAge(date){
    if(!date || date === "") return "";
    const now = new Date();
    const birthday = new Date(date);
    const diff = now.getTime() - birthday.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

//User information modal
const UserModal = ({user, handleExitModal})=>
{
    const values = Object.values(user)
    if(values.length === 0)
     return null;

 return (   
    <div className="user-modal modal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{role[user["actor"]]}</h5>
          <button onClick={handleExitModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="w-100">
            <tbody>
            <tr>
              <td className="pb-2 pt-2">First name:</td>
              <td className="pb-2 pt-2">{user["first_name"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Last name:</td>
              <td className="pb-2 pt-2">{user["last_name"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Email:</td>
              <td className="pb-2 pt-2">{user["email"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Platform:</td>
              <td className="pb-2 pt-2">{platform[user["platform"]]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Phone:</td>
              <td className="pb-2 pt-2">{user["phone"]}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Age:</td>
              <td className="pb-2 pt-2">{getAge(user["birthday_date"])}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2">Sex:</td>
              <td className="pb-2 pt-2">{user["sex"]}</td>
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

export default UserModal;