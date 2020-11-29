import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function getAllUsers() {
      return await http.get(
        `${API_URL_Dev}/Admin/GetAllUsers`
        ,
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }}
      );
  }

export async function changeRole(user) {
  return await http.post(
    `${API_URL_Dev}/Admin/ChangeRole`
  ,
  {
    id: user.client_id,
    currentRole: user.actor,
    newRole: user.actor_new 
  },
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
} 

export async function deleteUser(id) {
  return await http.delete(
    `${API_URL_Dev}/Admin/DeleteUser/${id}`,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
} 

export async function newPassword(id, password) {
  return await http.put(
    `${API_URL_Dev}/Admin/NewPassword/${id}/`,
    {password}
    ,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
} 
 
export async function getNotApprovedBusinesses() {
  return await http.get(
    `${API_URL_Dev}/Admin/GetNotApprovedBusinesses/`,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }}
    );
}

export function paginate(items, pageNumber, pageSize) 
{
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (items.slice(startIndex, endIndex));
};

export async function approvesBusinesses(ids) {
  return await http.put(
    `${API_URL_Dev}/Admin/ApproveBusinesses/`,
    ids,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }}
    );
};    
    
export async function getEvents() 
{
  return await http.get(
        `${API_URL_Dev}/Admin/GetEvents/`,
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }}
        );   
};


export async function deleteEvent(id) {
  return await http.delete(
    `${API_URL_Dev}/Admin/DeleteEvent/${id}/`,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }}
    );
  };

export async function editEvent(req) 
    {
      return await http.post(
        `${API_URL_Dev}/Admin/EditEvent`,
        req,
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }}
        );
    };    

    export async function editEventDescription(req) 
    {
      return await http.post(
        `${API_URL_Dev}/Admin/EditEventDescription`,
        req,
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }}
        );
    };

    export async function addEvent(req) 
    {
      return await http.put(
        `${API_URL_Dev}/Admin/AddEvent`,
        req,
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }}
        );
    };