import React from 'react';

const UserRaw = 
({
  user,
  handleOnSaveChangeRole,
  isRoleChanged,
  handelSelectOnChange,
  handleDeleteUser,
  handleClickOnInfo
}
) =>
{
  const roles = [
  {value: "client", name: "Client"},
  {value: "business", name: "Business Owner"},
  {value: "admin", name: "Admin"} ];
  const { actor: role, first_name, last_name, email, request, client_id: id } = user;
  const fullName = `${first_name} ${last_name}`;
  
  return (
    <tr>
                    <td className="p-2">{fullName}</td>
                    <td className="p-2">{email}</td>
                    <td>
                      <select onChange={(event)=>{handelSelectOnChange(event, user)}} defaultValue={role} className="custom-select w-auto">
                        {roles.map(roleObj => 
                          {
                             return (
                             <option key={roleObj.value} value={roleObj.value}>{roleObj.name}</option>
                             ); 
                          })
                        }
                      </select>
                      <button
                      disabled={!isRoleChanged(user)}
                      type="button"
                      className="btn btn-success btn-sm ml-2"
                      onClick={()=>{handleOnSaveChangeRole(user)}}
                    >
                      Save
                    </button>
                    </td>
                      <td className="p-2">
                        {request && <b>Business Owner</b> || "No Request"}
                      </td>
                    <td className="p-2 text-center">
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={()=>handleClickOnInfo(user)}
                    >
                      Info
                    </button>
                    </td>
                    <td className="p-2 text-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={()=>handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                    </td>
                </tr>
  );
}

export default UserRaw