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
