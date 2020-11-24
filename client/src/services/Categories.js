import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";

export async function getAllMainCategories() {
  try {
    const main_list = await http.get(
      `${API_URL_Dev}/MainCategory/GetAllMainCategory`
    );
    return main_list.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}

export async function postSubCategory(req) {
  try {
    const main_list = await http.post(
      `${API_URL_Dev}/Category/AddMainAndSubRelationship`,
      req
    ,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }});
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function deleteSubCategory(main_id, sub_id) {
  try {
    const main_list = await http.delete(
      `${API_URL_Dev}/Category/RemoveMainAndSubRelationship/${main_id}/${sub_id}`
    ,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }});
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function getAllMainCategoriesAdmin() {
  try {
    const main_list = await http.get(
      `${API_URL_Dev}/MainCategory/GetAllMainCategoriesAdmin`
    ,{
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }});
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
    return [];
  }
}

export async function putCategories(id, is_active) {
  try {
    const main_list = await http.put(
      `${API_URL_Dev}/MainCategory/ChangeActiveMainCategory/${id}`,{is_active}
      , {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }}
      );
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function updateSubCategoryOfMainCategory(req) {
  try {
    const main_list = await http.put(
      `${API_URL_Dev}/Category/UpdateSubCategoryOfMainCategory`,
      req
    ,
    {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }});
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
