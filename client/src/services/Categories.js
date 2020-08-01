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

export async function getAllMainCategoriesAdmin() {
  try {
    const main_list = await http.get(
      `${API_URL_Dev}/MainCategory/GetAllMainCategoryAdmin`
    );
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}

export async function putCategories(id, is_active) {
  try {
    const main_list = await http.put(
      `${API_URL_Dev}/MainCategory/ChangeActiveMainCategory/${id}`,
      { is_active }
    );
    return main_list.data;
  } catch (e) {
    console.log("Check your connection , error:", e);
  }
}
