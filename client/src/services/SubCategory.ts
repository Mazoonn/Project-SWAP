import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";

export async function getSubCategoriesId(id: string): Promise<any> {
  try {
    const main_and_sub_list: AxiosResponse<any> = await http.get(`${API_URL_Dev}/Category/GetMainAndSubRelationship/${id}`);
    return main_and_sub_list.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}
