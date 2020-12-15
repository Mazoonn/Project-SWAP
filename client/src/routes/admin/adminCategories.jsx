import React, { useEffect } from "react";
import { getAllMainCategoriesAdmin, putCategories } from "../../services/Categories";

const AdminCategories = (props) => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      document.title = "Categories";
      setLoadingPage(true);
      const data = await getAllMainCategoriesAdmin();
      if (!isMounted) return;
      setCategories(data);
      setLoadingPage(false);
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const AreChanged = () => {
    let result = false;
    result = categories.some((category) => (category.is_changed === undefined ? false : category.is_changed));
    return result;
  };

  const handleOnChangeIsActive = (index) => {
    const changedCategories = [...categories];
    const category = changedCategories[index];
    category.is_active = !category.is_active;
    category.is_changed = category.is_changed === undefined ? true : !category.is_changed;
    setCategories(changedCategories);
  };

  const handlePutCategories = async () => {
    setLoading(true);
    const request = [];
    for (const category of categories) {
      if (category.is_changed) request.push(category);
    }
    await Promise.all(
      request.map((category) => {
        return putCategories(category.id, category.is_active);
      })
    );
    categories.forEach((category) => {
      category.is_changed = false;
    });
    setCategories(categories);
    setLoading(false);
  };

  if (loadingPage)
    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Main Categories</h5>
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
    <React.Fragment>
      <div className="card m-auto">
        <h5 className="card-header">Main Categories</h5>
        <div className="card-body">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Google Value</th>
                <th className="text-center">Active</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.google_value}</td>
                    <td className="text-center">
                      <div>
                        <input
                          onChange={() => {
                            handleOnChangeIsActive(index);
                          }}
                          type="checkbox"
                          checked={category.is_active}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-center">
            <button disabled={!AreChanged() || loading} className="btn btn-primary" type="button" onClick={handlePutCategories}>
              {(loading && "Loading...") || "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminCategories;
