import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";
import { Business, Business_owner_is_active } from "../models/Business";
import { Place, PlaceCategory } from "../models/Place";

export async function getAllBusinesses(business_owner_id: string): Promise<any> {
    return await http.get(`${API_URL_Dev}/business/GetAllBusinesses/${business_owner_id}`,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }});
}

export async function addBusinessOwner(business_owner_id: string): Promise<any> {
  try {
    const is_business_owner: AxiosResponse<any> = await http.post(`${API_URL_Dev}/business/AddBusinessOwner/`, business_owner_id);
    return is_business_owner.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function deleteBusinessOwner(business_owner_id: string): Promise<any> {
  try {
    const is_deleted: AxiosResponse<any> = await http.delete(`${API_URL_Dev}/business/DeleteBusinessOwner`, {
      params: business_owner_id,
    });
    return is_deleted.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function addBusiness(business: Business, place: Place, placeCategory: PlaceCategory): Promise<any> {
  try {
    const businessRequest = {
      business,
      place,
      placeCategory,
    };
    const response: AxiosResponse<any> = await http.post(`${API_URL_Dev}/business/AddBusiness`, businessRequest);
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
export async function editBusiness(req: Business): Promise<any> 
{
  return await http.put(`${API_URL_Dev}/business/EditBusiness/${req.business_owner_id}`, req,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
}

export async function changeActiveBusiness(req: Business_owner_is_active): Promise<any> {
    return await http.put(`${API_URL_Dev}/business/ChangeActiveBusiness/${req.business_owner_id}`, req,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }});

}

export async function deleteBusiness(req: Business_owner_is_active): Promise<any> 
{
  return await http.delete(`${API_URL_Dev}/business/RemoveBusiness/${req.business_owner_id}`, { data: req, headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  } });
}
