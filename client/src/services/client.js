import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export function clientRegister(body) {
  return http.post(`${API_URL_Dev}/client/register`, body);
}

export function clientLogin(body) {
  return http.post(`${API_URL_Dev}/client/login`, body);
}

export function clientInfo(id) {
  return http.get(`${API_URL_Dev}/client/getInfo/${id}`,
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
  });
}

export function changePassword(id, password) {
  return http.post(`${API_URL_Dev}/client/changePassword/${id}`,{ password }, 
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`},   
  });
}

export function requestBusinessOwner(id) {
  return http.post(`${API_URL_Dev}/client/requestBusinessOwner/${id}`, null, 
  {
    headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`},   
  });
}