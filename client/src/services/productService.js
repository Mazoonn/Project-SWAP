import { API_URL_Dev } from "../config.json";
import http from "../Utils/httpRequest/httpRequest";
import axios from "axios";

export async function deleteProduct(req)
 {
    try 
    {
      const response = await axios.delete(`${API_URL_Dev}/business/product/DeleteProduct/${req.business_id}/${req.product_id}/${req.client_id}`);
      return response.data;
    } catch (e) {
      console.log("Check your connection , error:", e);
    }
  }

export async function GetAllProducts(business_id, clientId)
   {
    try 
    {
      const products = await http.get(`${API_URL_Dev}/business/product/GetAllProducts/${business_id}/${clientId}`);
      return products.data;
    } 
    catch(e) 
    {
      console.log("Check you connection , error:", e);
    }
  }

export async function AddProduct(product, clientId) 
{
    try {
      const newProduct = await http.post(`${API_URL_Dev}/business/product/AddProduct/${clientId}`, product);
      return newProduct.data;
    } catch (e) {
      console.log("Check you connection , error:", e);
    }
}

export async function ChangeProductActive(product, clientId) {
  try {
    const is_active = await http.post(`${API_URL_Dev}/business/product/ChangeProductActive/${clientId}`, product);
    return is_active.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function updateProduct(req, clientId)
{
  try {
    const response = await http.put(`${API_URL_Dev}/business/product/UpdateProduct/${clientId}`, req);
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}