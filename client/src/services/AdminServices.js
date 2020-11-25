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
  