import http from "../Utils/httpRequest/httpRequest";
import { API_URL_Dev } from "../config.json";
// const CategorySubCategory = [
//   { id1: 1, id2: 1, name: "Cafe" },
//   { id1: 1, id2: 2, name: "Meat" },
//   { id1: 1, id2: 3, name: "Bakery" },
//   { id1: 2, id2: 1, name: "Cafe" },
//   { id1: 2, id2: 2, name: "Beer Garden" },
//   { id1: 2, id2: 3, name: "Dance Bar" },
//   { id1: 3, id2: 1, name: "Art" },
//   { id1: 3, id2: 2, name: "Biographical" },
//   { id1: 3, id2: 3, name: "Automobile" },
//   { id1: 3, id2: 1, name: "Children's" },
//   { id1: 4, id2: 2, name: "Slots" },
//   { id1: 4, id2: 3, name: "Video Poker" },
// ];

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
