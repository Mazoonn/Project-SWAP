import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function getEvents(req) {
  return await http.get(`${API_URL_Dev}/events/GetEvents`, 
  { 
      params:req,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }     
  });
}

