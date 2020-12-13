import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function getBusinessesByCategories(req) 
{
    try
    {
        const request = await http.get(`${API_URL_Dev}/business/GetFilteredBusinesses`, 
        { 
            params:req,     
        });
        return request.data
    }
    catch(err)
    {
        console.log(err);
        return [];
    }
}

export async function addBusiness(req) 
{
    return await http.post(`${API_URL_Dev}/business/AddBusiness`,req);
}


