import React from 'react';

//Business raw
const AdminBusinessRaw = ({ business, handleOnChangeApprove, handleOnClickUser, handleOnClickBusiness, handleOnClickDescriptionModal }) =>
{
    return (<tr>
        <td className="p-2">{business.user["email"]}</td>
        <td className="p-2">{business["name"]}</td>
        <td className="text-center">
            <button onClick={()=>{handleOnClickDescriptionModal(business["description"])}} className="btn btn-info btn-sm text-center">Description</button>
        </td>
        <td className="p-2">{business["country"]}</td>
        <td className="text-center">
            <button onClick={()=>{handleOnClickBusiness(business)}} className="btn btn-info btn-sm">Business</button>
        </td>
        <td className="text-center">
            <button onClick={()=>{handleOnClickUser(business.user)}} className="btn btn-info btn-sm">User</button>
        </td>
        <td className="pt-2 text-center">
            <input onChange={()=>{handleOnChangeApprove(business)}} checked={business["approve"]} type="checkbox"/>
        </td>
    </tr>);
}

export default AdminBusinessRaw