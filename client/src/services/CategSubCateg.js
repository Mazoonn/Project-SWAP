import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
export async function getSubCategoriesId(id) {
  try {
    const main_and_sub_list = await http.get(
      `${API_URL_Dev}/Category/GetMainAndSubRelationship/${id}`
    );
    return main_and_sub_list.data;
  } catch (e) {
    console.log("Check you connection , error:", e);
  }
}
