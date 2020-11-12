import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
import { AxiosResponse } from "axios";
import axios from "axios";
import { Product, Product_is_active, Product_business_ids } from "../models/Product";

export async function GetAllProduct(business_id: string): Promise<any> {
  try {
    const is_Product_owner: AxiosResponse<any> = await http.get(`${API_URL_Dev}/business/product/GetAllProduct/${business_id}`);
    return is_Product_owner.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function AddProduct(product: Product): Promise<any> {
  try {
    const is_Product_owner: AxiosResponse<any> = await http.post(`${API_URL_Dev}/business/product/AddProduct/`, product);
    return is_Product_owner.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function ChangeProductToActive(product: Product_is_active): Promise<any> {
  try {
    const is_active: AxiosResponse<any> = await http.put(`${API_URL_Dev}/business/product/ChangeProductToActive/`, product);
    return is_active.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function deleteProduct(req: Product_business_ids): Promise<any> {
  try {
    const response = await axios.delete(`${API_URL_Dev}/business/product/DeleteProduct/${req.business_id}/${req.product_id}`, {
      params: req,
    });
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
export async function updateProduct(req: Product): Promise<any> {
  try {
    const response: AxiosResponse<any> = await http.put(`${API_URL_Dev}/business/product/UpdateProduct`, req);
    return response.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
