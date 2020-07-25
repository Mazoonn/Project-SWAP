import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function clientRegister(body) {
  try {
    const response = await http.post(`${API_URL_Dev}/client/register`, body);
    if (!response)
      alert("there was an error with the register of the new client");
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function clientLogin(body) {
  try {
    const response = await http.post(`${API_URL_Dev}/client/login`, body);
    if (!response)
      alert("there was an error with the register of the new client");
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}
