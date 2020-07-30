import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export function clientRegister(body) {
  return http.post(`${API_URL_Dev}/client/register`, body);
}

export function clientLogin(body) {
  return http.post(`${API_URL_Dev}/client/login`, body);
}
