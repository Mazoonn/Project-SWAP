import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function clientRegister(body) {
  try {
    const response = await http.post(`${API_URL_Dev}/client/register`, body);
    console.log(response);
    if (!response)
      alert("there was an error with the register of the new client");
    return response;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export function clientLogin(body) {
  return http.post(`${API_URL_Dev}/client/login`, body);
}
