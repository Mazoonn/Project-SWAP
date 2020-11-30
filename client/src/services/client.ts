import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";
import { clientInfo } from "../models/clientInfo";

export function clientRegister(body: string): Promise<any> {
  return http.post(`${API_URL_Dev}/client/register`, body);
}

export function clientLogin(body: string): Promise<any> {
  return http.post(`${API_URL_Dev}/client/login`, body);
}

export async function getClientInfo(client_id: string): Promise<any> {
  try {
    const client_info: AxiosResponse<any> = await http.get(`${API_URL_Dev}/client/getClientInfo/${client_id}`);
    return client_info.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}
export async function EditClient(client_info: clientInfo): Promise<any> {
  try {
    const is_change: AxiosResponse<any> = await http.post(`${API_URL_Dev}/client/EditClient/`, client_info);
    return is_change.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function DeleteClient(client_id: string): Promise<any> {
  try {
    const is_delete: AxiosResponse<any> = await http.delete(`${API_URL_Dev}/client/DeleteClient/`);
    return is_delete.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}
