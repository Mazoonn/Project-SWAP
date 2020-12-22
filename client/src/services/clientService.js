import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

//Register request
//Input: registerDTO object
export function clientRegister(body) {
  return http.post(`${API_URL_Dev}/client/register`, body);
}

//Login request
//Input: loginDTO object
export function clientLogin(body) {
  return http.post(`${API_URL_Dev}/client/login`, body);
}

//clientInfo request
//Input: clientId
//Output: clientDTO Object
export function clientInfo(id) {
  return http.get(`${API_URL_Dev}/client/getInfo/${id}`,
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
  });
}

//change password request
//Input: clientId, password
export function changePassword(id, password) {
  return http.post(`${API_URL_Dev}/client/changePassword/${id}`,{ password }, 
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`},   
  });
}

//business owner request
//Input: clientId
export function requestBusinessOwner(id) {
  return http.post(`${API_URL_Dev}/client/requestBusinessOwner/${id}`, null, 
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`},   
  });
}

//Update information
//Input: clientId, clientInfoDTO
export function updateInformation(req, id) {
  return http.post(`${API_URL_Dev}/client/updateInformation/${id}`, req, 
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`},   
  });
}