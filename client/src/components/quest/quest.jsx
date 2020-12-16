import React, { Component } from "react";
import { getAllMainCategories } from "../../services/Categories";
import Category from "./category";
import { getSubCategoriesId } from "../../services/SubCategory";
import SubCategory from "./subCategory";
import { getPlaces } from "./../../Utils/httpRequest/GoogleRequest";
import { getEvents } from "./../../services/EventsService";
import { radius } from "../../config.json";
import { fetchCoordinates } from "../../Utils/httpRequest/GoogleRequest";
import { getBusinessesByCategories } from "../../services/BusinessService";
import NoResults from "./NoResults";

const removeGooglePlaces = (google, businesses, events) => {
  const obj = {};

  google.forEach((googleItem) => {
    googleItem.places.forEach((place) => {
      place.ids = googleItem.ids;
      obj[place.place_id] = place;
    });
  });
  businesses.forEach((business) => {
    delete obj[business.place_id];
  });
  events.forEach((event) => {
    delete obj[event.place_id];
  });

  return Object.values(obj);
};

const isNotHidden = (categories) => {
  let result = false;
  categories.some((category) => {
    if (category.isCurrentlySelected) result = result || category.subCategory.some((sub) => sub.isSelected);
  });

  return result;
};

class Quest extends Component {
  state = {
    categoryList: [],
    columnsInSubCategories: 3,
    columnsOfSubcategories: 2,
    isLoading: false,
    loadingPage: false,
    noResults: false,
  };

  getPlaces = async () => {
    this.setState({ isLoading: true });
    const keysToRemove = ["isFinished", "route", "radioValue", "places"];
    const businessesRequests = [];
    const location = await fetchCoordinates();
    const eventsReq = {
      radius,
      lat: location.latitude,
      lng: location.longitude,
    };
    const places = [];
    this.state.categoryList.forEach((category) => {
      if (category.isCurrentlySelected) {
        const businessReq = { ...eventsReq, subIds: [], mainId: category.id };
        category.subCategory.forEach((sub) => {
          if (sub.isSelected) {
            const categoryObj = {};
            businessReq.subIds.push(sub.sub_id);
            categoryObj.sub_id = sub.sub_id;
            categoryObj.sub_value = sub.google_value || sub.sub_name;
            categoryObj.main_id = category.id;
            categoryObj.main_value = category.google_value || category.name;
            places.push(categoryObj);
          }
        });
        if (businessReq.subIds.length > 0) businessesRequests.push(businessReq);
      }
    });

    const events = await getEvents(eventsReq);
    const data = await Promise.all(businessesRequests.map((req) => getBusinessesByCategories(req)));
    const businesses = data.reduce((arr, row) => arr.concat(row), []);
    let google = await getPlaces(places, location, true);
    google = removeGooglePlaces(google, businesses, events.data);
    if (google.length === 0 && businesses.length === 0) {
      this.setState({ isLoading: false, noResults: true });
      return;
    }
    keysToRemove.forEach((key) => {
      window.localStorage.removeItem(key);
    });
    localStorage.setItem("questPlaces", JSON.stringify(google));
    localStorage.setItem("questBusinesses", JSON.stringify(businesses));
    localStorage.setItem("questEvents", JSON.stringify(events.data));
    this.props.history.push("/");
  };

  handleCloseNoResults = () => {
    this.setState({ noResults: false });
  };

  handleGetCategories = async () => {
    this.setState({ loadingPage: true });
    try {
      const categories = await getAllMainCategories();
      categories.data.forEach((category) => {
        category.isFirstSelected = false;
        category.isCurrentlySelected = false;
      });
      this.setState({ categoryList: categories.data });
    } catch (err) {
      console.log(err);
    }
    finally
    {
      this.setState({ loadingPage: false });
    }
  };

  handleOnClickCategory = async (key) => {
    const categories = [...this.state.categoryList];
    const indexCategories = categories.findIndex((category) => category.id === key);
    if (!categories[indexCategories].isFirstSelected) 
    {
      this.setState({ loadingPage: true });
      categories[indexCategories].isFirstSelected = true;
      categories[indexCategories].isCurrentlySelected = true;
      categories[indexCategories].subCategory = await this.handleGetSubCategories(key);
      this.setState({ loadingPage: false });
    } 
    else
    {
      categories[indexCategories].isCurrentlySelected = !categories[indexCategories].isCurrentlySelected;
      if(categories[indexCategories].isCurrentlySelected)
       categories[indexCategories].subCategory.forEach(category => { category.isSelected = false });
    }
    this.setState({ categoryList: categories });
  };

  handleOnClickSubCategory = (keyCategory, keySubCategory) => {
    const categoryList = [...this.state.categoryList];

    const indexCategory = categoryList.findIndex((category) => category.id === keyCategory);
    const indexSubCategory = categoryList[indexCategory].subCategory.findIndex(
      (subCategory) => subCategory.sub_id === keySubCategory
    );
    const flag = categoryList[indexCategory].subCategory[indexSubCategory].isSelected;
    categoryList[indexCategory].subCategory[indexSubCategory].isSelected = !flag;
    this.setState({ categoryList });
  };

  handleGetSubCategories = async (id) => 
  {
    try
    {
      const subCategory = await getSubCategoriesId(id);
      subCategory.data.forEach((category) => {
        category.isSelected = false;
      });
      return subCategory.data;
    }
    catch(err)
    {
      console.log(err);
      return [];
    }
  };

  handleDivideSubCategories = () => {
    const categories = this.state.categoryList.filter((category) => category.isCurrentlySelected);
    if(categories.length == 0)
    return (
      <React.Fragment>
        <div className="card-body">
          <h5>Instructions</h5>
          <p className="card-text">
            <span>Please select the desired activity on the main left bar in order to see the options.</span>
            <br/> 
            <span>
              Choose one or multiple options for further directions and recommendations the closest places will be reviled to you on the map.
            </span>
            <br/> 
            <span>You can build our route by selecting the places and organize them.</span>
            <br/>
            <span>There is an option to choose your transport by Route.</span>
            <br/>
            <span>Events are marked on the map with a Star and it is only for limited time.</span>
            </p>
         </div>
     </React.Fragment>
  );


    
    return (
      <div className={`row row-cols-${this.state.columnsOfSubcategories}`}>
        {categories.map((category) => {
          return (
            <SubCategory
              key={category.id}
              isLoading={this.state.isLoading}
              category={category}
              columns={this.state.columnsInSubCategories}
              clickSubCategory={this.handleOnClickSubCategory}
            ></SubCategory>
          );
        })}
      </div>
    );
  };

  componentDidMount() {
    this.mounted = true;
    document.title = "Quest";
    if(this.mounted) this.handleGetCategories();
  }

  componentWillUnmount()
  {
    this.mounted = false;
  }

  render() {
    const { isLoading, categoryList, loadingPage, noResults } = this.state;

    if (loadingPage)
      return (
        <React.Fragment>
          <div className="text-center">
            <div className="spinner-border text-primary">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <div className="row ml-2">
        <div>
          <Category isLoading={isLoading} handleOnClickCategory={this.handleOnClickCategory} categoryList={categoryList} />
          <div className="text-center p-3">
            {(!isLoading && (
              <button
                onClick={this.getPlaces}
                disabled={!isNotHidden(categoryList)}
                type="button"
                className="btn btn-primary btn-md"
              >
                Next
              </button>
            )) || (
              <button className="btn btn-primary btn-md" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            )}
          </div>
        </div>
        <div className="col">
        <div>
        <div className="card m-auto">
          <h5 className="card-header text-center">Quest</h5>
          {this.handleDivideSubCategories()}
          <div className="card-body">
          </div>
        </div>
          </div>
        </div>
        </div>    
        <NoResults noResults={noResults} handleClose={this.handleCloseNoResults} />
      </React.Fragment>
    );
  }
}

export default Quest;
