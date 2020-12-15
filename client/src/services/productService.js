import { API_URL_Dev } from "../config.json";
import http from "../Utils/httpRequest/httpRequest";
import axios from "axios";

export async function deleteProduct(req)
{
  return await axios.delete(`${API_URL_Dev}/business/product/DeleteProduct/${req.business_id}/${req.product_id}/${req.client_id}`);
}

export async function GetAllProducts(business_id, clientId)
{
  return await http.get(`${API_URL_Dev}/business/product/GetAllProducts/${business_id}/${clientId}`);
}

export async function AddProduct(product, clientId) 
{
  return await http.post(`${API_URL_Dev}/business/product/AddProduct/${clientId}`, product);
}

export async function ChangeProductActive(product, clientId) {
  return await http.post(`${API_URL_Dev}/business/product/ChangeProductActive/${clientId}`, product);
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