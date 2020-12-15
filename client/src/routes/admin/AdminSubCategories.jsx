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

const AdminSubCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [isDefault, setIsDefault] = React.useState(true);
  const [indexCategory, setIndexCategory] = React.useState("default");
  const [subCategory, setSubCategory] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("default");

  useEffect(() => {
    document.title = "Subcategories";
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      const data = await getAllMainCategoriesAdmin();
      if (!isMounted) return;
      setCategories(data);
      setLoading(false);
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnChangeSelect = async (event) => {
    const index = event.target.value;
    setSubCategory({});
    setSelectValue(index);

    if (index !== "default") 
    {
      setLoading(true);
      setIndexCategory(index);
      setIsDefault(false);
      const category_id = categories[index].id;
      try
      {
        const newSubCategories = await getSubCategoriesId(category_id);
        addNewValuesToSubCategories(newSubCategories.data);
        setSubCategories(newSubCategories.data);
      }
      catch(err)
      {
        console.log(err);
      }
      finally
      {
        setLoading(false);
      }
    } 
    else 
    {
      setSubCategories([]);
      setIsDefault(true);
    }
  };

  const handleOnChangeSubCategory = (event, index) => {
    const { value, name } = event.target;
    if (index !== -1) {
      const newSubCategories = [...subCategories];
      const category = newSubCategories[index];
      category[name] = value;
      setSubCategories(newSubCategories);
    } else {
      const newSubCategory = { ...subCategory };
      newSubCategory[name] = value;
      setSubCategory(newSubCategory);
    }
  };

  const handleOnClickSaveSubCategory = async (index) => {
    setLoading(true);
    const newSubCategories = [...subCategories];
    const subCategory = subCategories[index];
    const { main_id, sub_id, sub_name_new, google_value_new, descrition_new } = subCategory;
    const req = {
      main_id,
      sub_id,
      sub_name: sub_name_new,
      descrition: descrition_new,
      google_value: google_value_new,
    };
    await updateSubCategoryOfMainCategory(req);
    subCategory.sub_name = subCategory.sub_name_new;
    subCategory.descrition = subCategory.descrition_new;
    subCategory.google_value = subCategory.google_value_new;
    setSubCategories(newSubCategories);
    setLoading(false);
  };

  const isSubCategoryChanged = (index) => {
    let b1 = true,
      b2 = false;
    const sCategory = subCategories[index];
    const values = ["descrition", "sub_name", "google_value"];
    values.forEach((value) => {
      b1 = b1 & (sCategory[`${value}_new`] !== "");
      b2 = b2 || sCategory[value] !== sCategory[`${value}_new`];
    });
    return b1 && b2;
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
    setLoading(true);
    const main_id = categories[indexCategory].id;
    const sub_id = subCategories[indexOfSubCategory].sub_id;
    await deleteSubCategory(main_id, sub_id);
    const newSubCategories = subCategories.filter((subCat) => subCat.sub_id !== sub_id);
    setSubCategories(newSubCategories);
    setLoading(false);
  };

  const handleAddNewSubCategory = async () => {
    setLoading(true);
    const main_id = categories[indexCategory].id;
    const category = { ...subCategory };
    setSubCategory({});
    category.main_id = main_id;
    await postSubCategory(category);
    const newSubCategories = await getSubCategoriesId(main_id);
    addNewValuesToSubCategories(newSubCategories);
    setSubCategories(newSubCategories);
    setLoading(false);
  };

  if (loading)
    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Sub Categories</h5>
          <div className="card-body">
            <div className="text-center">
              <div className="spinner-border text-primary">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  return (
    <div>
      <div className="card m-auto">
        <h5 className="card-header">Sub Categories</h5>
        <div className="card-body">
          <h4>Categories</h4>
          <select
            id="categories"
            onChange={(event) => handleOnChangeSelect(event)}
            className="custom-select mb-4"
            style={{ width: "200px" }}
            value={selectValue}
          >
            <option value={"default"}>Category...</option>
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
                        placeholder="Enter category name"
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
                        placeholder="Enter description"
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
                        placeholder="Enter google value"
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
      </div>
    </div>
  );
};

export default AdminSubCategories;
