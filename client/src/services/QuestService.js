import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function addQuest(req) {
  return await http.post(`${API_URL_Dev}/quest/addQuest`,
  req,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }}
  );
}
