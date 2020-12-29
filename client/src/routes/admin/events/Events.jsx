import React, { Component } from "react";
import { getEvents, paginate, deleteEvent, editEvent, editEventDescription, addEvent } from "../../../services/AdminServices";
import EventRaw from "./EventsRaw";
import EventDescriptionModal from "./EventDescriptionModal";
import FilterInput from "./FilterInput";
import Pagination from "../AdminPagination";
import AddEventModal from "./AddEventModal";
import getAddress from "../../../services/Address";


//Filter array of event by name, country, settlement and street
const filterEvents = (events, name, country, settlement, street) => {
  return events.filter(
    (event) =>
      event.name.toLowerCase().startsWith(name.toLowerCase()) &&
      event.country.toLowerCase().startsWith(country.toLowerCase()) &&
      event.settlement.toLowerCase().startsWith(settlement.toLowerCase()) &&
      event.street.toLowerCase().startsWith(street.toLowerCase())
  );
};

//add new values to array of event
const addNewValues = (events) => {
  const values = ["name", "price"];

  events.forEach((event) => {
    values.forEach((value) => {
      event[`${value}_new`] = event[value];
    });
  });
};

//Check if the address is a full address
//if not return error message else return empty string
const addressValidate = (address) => {
  const schema = ["country", "settlement", "street"];

  if (schema.some((value) => !address[value])) return "Address must contain Country, Settlement and Street Name";
  return "";
};

//Get place object
const getPlace = (address) => {
  if (!address.address_components) return {};
  const place = getAddress(address);
  place.place_id = address.place_id;
  place.latitude = address.geometry.location.lat();
  place.longitude = address.geometry.location.lng();

  return place;
};

//Admin events page
class AdminEvents extends Component {
  state = {
    events: [],
    loading: false,
    loadingDescription: false,
    loadingNewEvent: false,
    modal: {},
    filter: {
      name: "",
      country: "",
      settlement: "",
      street: "",
    },
    pagination: {
      pageSize: 10,
      currentPage: 1,
    },
    newEvent: {
      isActive: false,
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      price: "",
      place: {},
      errors: {},
    },
  };

  //set to default parameters when page reloaded
  handleReloadPage = (events) => {
    const pagination = { ...this.state.pagination };
    pagination.currentPage = 1;
    this.setState({
      events,
      pagination,
      loadingNewEvent: false,
      filter: {
        name: "",
        country: "",
        settlement: "",
        street: "",
      },
      newEvent: {
        isActive: false,
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        price: "",
        place: {},
        errors: {},
      },
    });
  };

  //Add new event if the values are legal else set error
  handleClickOnSaveNewEvent = async () => {
    const newEvent = { ...this.state.newEvent };
    const { place } = newEvent;

    const error = addressValidate(place);
    newEvent.errors.address = error;
    this.setState({ newEvent });
    if (error) return;
    this.setState({ loadingNewEvent: true });
    try {
      const { end_date, start_date, description, name, price } = this.state.newEvent;
      const place = { ...this.state.newEvent.place };
      place.name = name;
      place.description = description;
      const req = {
        end_date,
        start_date,
        price,
        place,
      };
      const promiseEvent = await addEvent(req);
      const { data: event } = promiseEvent;
      event.name_new = event.name;
      event.price_new = event.price;
      const events = [...this.state.events];
      events.push(event);
      this.handleReloadPage(events);
    } catch (err) {
      newEvent.errors.server = "There is event or business in this address";
      this.setState({ loadingNewEvent: false, newEvent });
      console.log(err);
    }
  };

  //Save address to state
  handleSetAddress = (address) => {
    const newEvent = { ...this.state.newEvent };
    const place = getPlace(address);
    newEvent.place = place;
    this.setState({ newEvent });
  };

  //Set title and set events from api
  componentDidMount() {
    document.title = "Events";
    this.getEvents();
  }

  //Get events from the api and set them
  getEvents = async () => {
    this.setState({ loading: true });
    try {
      const events = await getEvents();
      addNewValues(events.data);
      this.setState({ events: events.data, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  //Set values to state when they changed
  handleValuesOnChange = (event, e) => {
    const events = [...this.state.events];
    const index = events.indexOf(event);
    let { value, name } = e.target;
    if (name === "price") {
      if (parseFloat(value)) value = parseFloat(value);
      if (value < 0) return;
    }
    events[index][`${name}_new`] = value;
    this.setState({ events });
  };

  //Close event description modal
  handleExitDescriptionModal = () => {
    this.setState({ modal: {} });
  };

  //Open description modal
  handleClickOnDescription = (event) => {
    this.setState({
      modal: {
        eventId: event.place_id,
        description: event.description,
        description_new: event.description,
      },
    });
  };

  //Set description to the state
  handleOnChangeModal = (e) => {
    const modal = { ...this.state.modal };
    modal.description_new = e.target.value;
    this.setState({ modal });
  };

  //Filter events
  handleFilterOnChange = (e) => {
    const filter = { ...this.state.filter };
    const pagination = { ...this.state.pagination };
    pagination.currentPage = 1;
    const { value, name } = e.target;
    filter[name] = value;
    this.setState({ filter, pagination });
  };

  //Change page
  handlePageChange = (page) => {
    const pagination = { ...this.state.pagination };
    pagination.currentPage = page;
    this.setState({ pagination });
  };

  //Delete event button
  handleDeleteEvent = async (event) => {
    this.setState({ loading: true });
    try {
      await deleteEvent(event["place_id"]);
      const pagination = { ...this.state.pagination };
      pagination.currentPage = 1;
      const events = this.state.events.filter((e) => e.place_id !== event.place_id);
      this.setState({ events, loading: false, pagination });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  //add event button
  handleSaveEvent = async (event) => {
    this.setState({ loading: true });
    try {
      const { place_id, name_new: name, price_new: price } = event;
      const req = {
        place_id,
        name,
        price,
      };
      await editEvent(req);
      const events = [...this.state.events];
      const index = events.indexOf(event);
      events[index].name = name;
      events[index].price = price;
      this.setState({ events, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  //Edit description button
  handleEditDescription = async (event) => {
    this.setState({ loadingDescription: true });
    try {
      const { eventId: place_id, description_new: description } = event;
      const req = {
        place_id,
        description,
      };
      await editEventDescription(req);
      const events = [...this.state.events];
      const modal = { ...this.state.modal };
      const index = events.findIndex((e) => e.place_id === place_id);
      modal.description = modal.description_new;
      events[index].description = description;
      this.setState({ events, modal, loadingDescription: false });
    } catch (err) {
      this.setState({ loadingDescription: false });
      console.log(err);
    }
  };

  //Set default values to state
  handleExitAddEvent = () => {
    this.setState({
      newEvent: {
        isActive: false,
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        price: "",
        place: {},
        errors: {},
      },
    });
  };

  //Open new event modal
  handleClickOnAddEvent = () => {
    const newEvent = { ...this.state.newEvent };
    newEvent.isActive = true;
    this.setState({ newEvent });
  };

  //Set new event values to sate
  handleNewPlaceOnChange = (e) => {
    const newEvent = { ...this.state.newEvent };
    const { name, value } = e.target;
    if (name === "price" && value < 0) return;
    newEvent[name] = value;
    this.setState({ newEvent });
  };

  render() {
    const { events, modal: event, loading, loadingDescription, newEvent, loadingNewEvent } = this.state;
    if (loading)
      return (
        <React.Fragment>
          <div className="card m-auto">
            <h5 className="card-header">Events</h5>
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
    const { name, country, settlement, street } = this.state.filter;
    const { pageSize, currentPage } = this.state.pagination;
    const filteredEvents = filterEvents(events, name, country, settlement, street);
    const itemCount = filteredEvents.length;
    const newEvents = paginate(filteredEvents, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Events</h5>
          <div className="card-body">
            <div className="input-group w-75 mb-2">
              <button className="btn btn-sm btn-primary mr-1" onClick={this.handleClickOnAddEvent}>
                Add Event
              </button>
              <FilterInput value={name} onChange={this.handleFilterOnChange} name="name" placeholder="Filter Name" />
              <FilterInput value={country} onChange={this.handleFilterOnChange} name="country" placeholder="Filter Country" />
              <FilterInput
                value={settlement}
                onChange={this.handleFilterOnChange}
                name="settlement"
                placeholder="Filter Settlement"
              />
              <FilterInput value={street} onChange={this.handleFilterOnChange} name="street" placeholder="Filter Street" />
            </div>
            <table className="table table-bordered table-sm mt-2">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Settlement</th>
                  <th>Street</th>
                  <th className="text-center">Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th style={{ width: "9%" }}>Price</th>
                  <th colSpan={2} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {newEvents.map((event) => (
                  <EventRaw
                    handleSaveEvent={this.handleSaveEvent}
                    handleDeleteEvent={this.handleDeleteEvent}
                    key={event["place_id"]}
                    event={event}
                    handleValuesOnChange={this.handleValuesOnChange}
                    handleClickOnDescription={this.handleClickOnDescription}
                  />
                ))}
              </tbody>
            </table>
            <EventDescriptionModal
              handleEditDescription={this.handleEditDescription}
              event={event}
              loading={loadingDescription}
              handleExitModal={this.handleExitDescriptionModal}
              handleOnChange={this.handleOnChangeModal}
            />
            <Pagination
              currentPage={currentPage}
              itemsCount={itemCount}
              onPageChange={this.handlePageChange}
              pageSize={pageSize}
            />
            <AddEventModal
              setAddress={this.handleSetAddress}
              event={newEvent}
              handleExitModal={this.handleExitAddEvent}
              handleOnChange={this.handleNewPlaceOnChange}
              clickOnSave={this.handleClickOnSaveNewEvent}
              loading={loadingNewEvent}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminEvents;
