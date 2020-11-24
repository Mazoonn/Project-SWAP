import React, { useEffect } from "react";
import {
  updateSubCategoryOfMainCategory,
  deleteSubCategory,
  postSubCategory,
  getAllMainCategoriesAdmin,
} from "../../services/Categories";
import { getSubCategoriesId } from "../../services/SubCategory";

const addNewValuesToSubCategories = (subCategories) => {
  const values = ["descrition", "google_value", "sub_name"];
  subCategories.forEach((subCategory) => {
    !subCategory["descrition"] && (subCategory["descrition"] = "");
    !subCategory["google_value"] && (subCategory["google_value"] = "");

    values.forEach((value) => {
      subCategory[`${value}_new`] = subCategory[value];
    });
  });
};

const AdminSubCategories = (props) => {
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [isDefault, setIsDefault] = React.useState(true);
  const [indexCategory, setIndexCategory] = React.useState("default");
  const [subCategory, setSubCategory] = React.useState({});

useEffect(()=>
{
  const isMounted = { state: true };

  const fetchData = async () => 
  {
    if(!isMounted.state) return; 
    const data = await getAllMainCategoriesAdmin();
    setCategories(data);
  };
  fetchData();
}, []);

  const handleOnChangeSelect = async (event) => {
    const index = event.target.value;
    setSubCategories([]);
    if (index !== "default") {
      const category_id = categories[index].id;
      const newSubCategories = await getSubCategoriesId(category_id);
      addNewValuesToSubCategories(newSubCategories);
      setSubCategories(newSubCategories);
      setIndexCategory(index);
      setIsDefault(false);
    } else setIsDefault(true);
  };

  const handleOnChangeSubCategory = (event, index) => {
    const value = event.target.value;
    const name = event.target.name;
    if (index !== -1) {
      const newSubCategories = [...subCategories];
      const category = newSubCategories[index];
      category[name] = value;
      newSubCategories[index] = category;
      setSubCategories(newSubCategories);
    } else {
      const newSubCategory = { ...subCategory };
      newSubCategory[name] = value;
      setSubCategory(newSubCategory);
    }
  };

  const handleOnClickSaveSubCategory = async (index) => {
    const { main_id, sub_id, sub_name_new, google_value_new, descrition_new } = subCategories[index];
    const req = {
      main_id,
      sub_id,
      sub_name: sub_name_new,
      descrition: descrition_new,
      google_value: google_value_new,
    };
    await updateSubCategoryOfMainCategory(req);
    const newSubCategories = await getSubCategoriesId(main_id);
    addNewValuesToSubCategories(newSubCategories);
    setSubCategories(newSubCategories);
  };

  const isSubCategoryChanged = (index) => {
    let result = false;
    const sCategory = subCategories[index];
    const values = ["descrition", "sub_name", "google_value"];
    values.forEach((value) => {
      if (sCategory[value] !== sCategory[`${value}_new`]) result = true;
    });
    return result;
  };

  const isValidSubCategory = () => {
    const sCategory = { ...subCategory };
    return (
      !sCategory ||
      Object.keys(sCategory).length !== 3 ||
      sCategory["sub_name"] === "" ||
      sCategory["descrition"] === "" ||
      sCategory["google_value"] === ""
    );
  };

  const handleDeleteSubCategory = async (indexOfSubCategory) => {
    const main_id = categories[indexCategory].id;
    const sub_id = subCategories[indexOfSubCategory].sub_id;
    await deleteSubCategory(main_id, sub_id);
    const newSubCategories = await getSubCategoriesId(main_id);
    addNewValuesToSubCategories(newSubCategories);
    setSubCategories(newSubCategories);
  };

  const handleAddNewSubCategory = async () => {
    const index = indexCategory;
    const main_id = categories[index].id;
    const category = { ...subCategory };
    setSubCategory({});
    category.main_id = main_id;
    await postSubCategory(category);

    const newSubCategories = await getSubCategoriesId(main_id);
    addNewValuesToSubCategories(newSubCategories);
    setSubCategories(newSubCategories);
  };

  return (
    <div>
      <h4>Categories</h4>
      <select id="categories" onChange={handleOnChangeSelect} className="custom-select mb-4" style={{ width: "200px" }}>
        <option value={"default"} defaultValue>
          Category...
        </option>
        {categories.map((category, index) => {
          return (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          );
        })}
      </select>
      {!isDefault && (
        <React.Fragment>
          <h3>Sub Categories</h3>
          <table className="table table-bordered table-sm mt-4">
            <thead>
              <tr>
                <th colSpan={5} className="text-center">
                  {categories[indexCategory].name}
                </th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Google Value</th>
                <th className="text-center">Save</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCategory, index) => {
                return (
                  <tr key={subCategory.sub_id}>
                    <td>
                      <input
                        onChange={(event) => {
                          handleOnChangeSubCategory(event, index);
                        }}
                        name="sub_name_new"
                        type="text"
                        className="form-control"
                        value={subCategory.sub_name_new}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(event) => {
                          handleOnChangeSubCategory(event, index);
                        }}
                        name="descrition_new"
                        type="text"
                        className="form-control"
                        value={subCategory.descrition_new}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(event) => {
                          handleOnChangeSubCategory(event, index);
                        }}
                        name="google_value_new"
                        type="text"
                        className="form-control"
                        value={subCategory.google_value_new}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          handleOnClickSaveSubCategory(index);
                        }}
                        disabled={!isSubCategoryChanged(index)}
                      >
                        Save
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          handleDeleteSubCategory(index);
                        }}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <input
                    value={(subCategory && subCategory.sub_name) || ""}
                    onChange={(event) => {
                      handleOnChangeSubCategory(event, -1);
                    }}
                    name="sub_name"
                    type="text"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={(subCategory && subCategory.descrition) || ""}
                    onChange={(event) => {
                      handleOnChangeSubCategory(event, -1);
                    }}
                    name="descrition"
                    type="text"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={(subCategory && subCategory.google_value) || ""}
                    onChange={(event) => {
                      handleOnChangeSubCategory(event, -1);
                    }}
                    name="google_value"
                    type="text"
                    className="form-control"
                  />
                </td>
                <td colSpan={2} className="text-center">
                  <button
                    disabled={isValidSubCategory()}
                    onClick={handleAddNewSubCategory}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    Add new
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      )}
    </div>
  );
};

export default AdminSubCategories;
