import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";


//Get all users
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

//Get user role
//Input: userDTO 
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

//Delete user
//Input: userId 
export async function deleteUser(id) {
  return await http.delete(
    `${API_URL_Dev}/Admin/DeleteUser/${id}`,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
} 


//Change user password
//Input: userId, password
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
 

//Get all not approved businesses
//Output: array of businessDTO
export async function getNotApprovedBusinesses() {
  return await http.get(
    `${API_URL_Dev}/Admin/GetNotApprovedBusinesses/`,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }}
    );
}


//Array paginate
//Input: array of items, page number, page size
//Return array 
export function paginate(items, pageNumber, pageSize) 
{
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (items.slice(startIndex, endIndex));
};

//Approve business
//Input: array of business Id
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


//Get all events
//Return array of eventDTO
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


//Delete event
//Input: eventId
export async function deleteEvent(id) {
  return await http.delete(
    `${API_URL_Dev}/Admin/DeleteEvent/${id}/`,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }}
    );
  };


//Edit event
//Input: eventDTO
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


//Edit event description
//Input: eventDescriptionDTO   
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


//Add new event
//Input: eventDTO 
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