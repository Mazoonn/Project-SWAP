import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";
import { Place, PlaceCategory } from "../models/Place";

export async function GetPlace(place_id: string): Promise<any> {
  try {
    const main_list: AxiosResponse<any> = await http.get(`${API_URL_Dev}/place/GetPlace/${place_id}`);
    return main_list.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function AddPlace(req: Place): Promise<any> {
  try {
    const main_list: AxiosResponse<any> = await http.post(`${API_URL_Dev}/place/AddPlace`, req);
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function DeletePlace(req: Place): Promise<any> {
  try {
    const main_list: AxiosResponse<any> = await http.delete(`${API_URL_Dev}/place/DeletePlace`);
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function EditPlace(req: Place): Promise<any> {
  try {
    const main_list: AxiosResponse<any> = await http.get(`${API_URL_Dev}/place/EditPlace`);
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function addOrEditPlaceToCategory(req: PlaceCategory): Promise<any> {
  try {
    const main_list: AxiosResponse<any> = await http.post(`${API_URL_Dev}/place/addOrEditPlaceToCategory`, req);
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
