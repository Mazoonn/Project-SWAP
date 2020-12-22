import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

//input: id of main category
//output: array of subcategories object
export async function getSubCategoriesId(id: string): Promise<any> 
{
    return await http.get(`${API_URL_Dev}/Category/GetMainAndSubRelationship/${id}`, 
    {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }});
}
