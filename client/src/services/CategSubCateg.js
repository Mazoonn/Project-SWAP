const CategorySubCategory = [
  { id1: 1, id2: 1, name: "Cafe" },
  { id1: 1, id2: 2, name: "Meat" },
  { id1: 1, id2: 3, name: "Bakery" },
  { id1: 2, id2: 1, name: "Cafe" },
  { id1: 2, id2: 2, name: "Beer Garden" },
  { id1: 2, id2: 3, name: "Dance Bar" },
];

export function getSubCategoriesId(id) {
  return CategorySubCategory.filter((key) => key.id1 === id);
}
