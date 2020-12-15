import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";

export async function getSubCategoriesId(id: string): Promise<any> 
{
    return await http.get(`${API_URL_Dev}/Category/GetMainAndSubRelationship/${id}`, 
    {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }});
}
