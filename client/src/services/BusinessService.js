import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

//Get nearby businesses
//Input: businessesDTO
//Output: array of businesses
export async function getBusinessesByCategories(req) 
{
    try
    {
        const request = await http.get(`${API_URL_Dev}/business/GetFilteredBusinesses`, 
        { 
            params:req,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
              }     
        });
        return request.data
    }
    catch(err)
    {
        console.log(err);
        return [];
    }
}

//Add new business
//Input: businessRequestDTO
export async function addBusiness(req) 
{
    return await http.post(`${API_URL_Dev}/business/AddBusiness`, req, 
    {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }});
}


