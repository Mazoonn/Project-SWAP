import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";
import { Business, Business_owner_is_active } from "../modles/Business";

export async function AddBusinessOwner(business_owner_id: string): Promise<any> {
  try {
    const is_business_owner: AxiosResponse<any> = await http.post(`${API_URL_Dev}/business/AddBusinessOwner/`, business_owner_id);
    return is_business_owner.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function DeleteBusinessOwner(business_owner_id: string): Promise<any> {
  try {
    const is_deleted: AxiosResponse<any> = await http.delete(`${API_URL_Dev}/business/DeleteBusinessOwner`, {
      params: business_owner_id,
    });
    return is_deleted.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function AddBusiness(req: Business): Promise<any> {
  try {
    const response: AxiosResponse<any> = await http.post(`${API_URL_Dev}/business/AddBusiness`, req);
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
export async function EditBusiness(req: Business): Promise<any> {
  try {
    const response: AxiosResponse<any> = await http.put(`${API_URL_Dev}/business/EditBusiness`, req);
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function ChangeActiveBusiness(req: Business_owner_is_active): Promise<any> {
  try {
    const response = await http.put(`${API_URL_Dev}/business/ChangeActiveBusiness`, req);
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function RemoveBusiness(req: Business_owner_is_active): Promise<any> {
  try {
    const response = await http.delete(`${API_URL_Dev}/business/RemoveBusiness`, { params: req });
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
