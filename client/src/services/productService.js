import { API_URL_Dev } from "../config.json";
import http from "../Utils/httpRequest/httpRequest";
import axios from "axios";

//delete product in db
//input: business id, product_id, client_id
export async function deleteProduct(req)
{
  return await axios.delete(`${API_URL_Dev}/business/product/DeleteProduct/${req.business_id}/${req.product_id}/${req.client_id}`,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
}

//get all products of business of business owner 
//input: business id, product_id, businessOwner_id
export async function GetAllProducts(business_id, clientId)
{
  return await http.get(`${API_URL_Dev}/business/product/GetAllProducts/${business_id}/${clientId}`,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
}

//add product to business of 
//input: product object, businessOwner_id
export async function AddProduct(product, clientId) 
{
  return await http.post(`${API_URL_Dev}/business/product/AddProduct/${clientId}`, product,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
}

//Change active product
//input product object, businessOwner_id 
export async function ChangeProductActive(product, clientId) {
  return await http.post(`${API_URL_Dev}/business/product/ChangeProductActive/${clientId}`, product,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
}

//Update product
//input product object, businessOwner_id 
//input product DTO, businessOwner_id 
export async function updateProduct(req, clientId)
{
  return await http.put(`${API_URL_Dev}/business/product/UpdateProduct/${clientId}`, req,
  {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }});
}