import React, { Component } from 'react';
import { getEvents, paginate, deleteEvent, editEvent, editEventDescription } from "../../../services/AdminServices";
import EventRaw from './EventsRaw';
import SearchLocationInput from './searchLocation';
import EventDescriptionModal from './EventDescriptionModal';
import FilterInput from './FilterInput';
import AdminPagination from "../AdminPagination";


const filterEvents = (events ,name, country, settlement, street) =>
{
    return events.filter(event =>
            event.name.toLowerCase().startsWith(name.toLowerCase()) &&
            event.country.toLowerCase().startsWith(country.toLowerCase()) &&
            event.settlement.toLowerCase().startsWith(settlement.toLowerCase()) &&
            event.street.toLowerCase().startsWith(street.toLowerCase())
            );
}

const addNewValues = events =>
{
    const values = ["name", "price"];

    events.forEach(event =>
        {
            values.forEach(value =>
                {
                    event[`${value}_new`] = event[value];
                });
        });
};

class AdminEvents extends Component {
    state = 
    {
        events: [],
        address: {},
        loading: false,
        loadingDescription: false,
        modal: {},
        filter:
        {
            name: "", 
            country: "", 
            settlement: "", 
            street: ""
        },
        pagination:
        {
            pageSize: 10,
            currentPage: 1,
        }
    }

    handleSetAddress= address =>
    {
        this.setState({address});
    }


    componentDidMount()
    {
        this.getEvents();
    }

    getEvents = async () =>
    {
        this.setState({ loading:true });
        try
        {
            const events = await getEvents();
            addNewValues(events.data);
            this.setState({ events: events.data, loading:false });
        }
        catch(err)
        {
            this.setState({ loading:false });
            console.log(err);
        }
    }

    handleValuesOnChange = (event, e) =>
    {
        const events = [...this.state.events];
        const index = events.indexOf(event);
        let { value, name } = e.target;
        if(name === "price")
        {
            if(parseFloat(value)) value = parseFloat(value);
            if(value < 0) return;
        }
        events[index][`${name}_new`] = value;
        this.setState({ events });
    }

    handleExitDescriptionModal = () =>
    {
        this.setState({ modal: {} });
    }

    handleClickOnDescription = event =>
    {
        this.setState({ modal: 
            {
                eventId: event.place_id,
                description: event.description,
                description_new: event.description
            } });
    }

    handleOnChangeModal = e =>
    {
        const modal = { ...this.state.modal };
        modal.description_new = e.target.value;
        this.setState({ modal });
    }

    handleFilterOnChange = e =>
    {
        const filter = { ...this.state.filter };
        const { value, name } = e.target;
        filter[name] = value;
        this.setState({ filter });
    
    }

    handlePageChange = page => {
        const pagination = { ...this.state.pagination };
        pagination.currentPage = page;
        this.setState({ pagination });
    }

    handleDeleteEvent = async event =>
    {
        this.setState({ loading: true });
        try
        {
            await deleteEvent(event["place_id"]);
            const events = this.state.events.filter(e=> e.place_id !== event.place_id);
            this.setState({ events, loading: false });
        }
        catch(err)
        {
            this.setState({ loading: false });
            console.log(err);
        }
    }

    handleSaveEvent = async event =>
    {
        this.setState({ loading: true });
        try
        {
            const {place_id, name_new : name, price_new: price } = event;
            const req = 
            {
                place_id,
                name,
                price
            };
            await editEvent(req);
            const events = [...this.state.events];
            const index = events.indexOf(event);
            events[index].name = name;
            events[index].price = price;
            this.setState({ events, loading: false });
        }
        catch(err)
        {
            this.setState({ loading: false });
            console.log(err);
        }
    }

    handleEditDescription = async event =>
    {
        this.setState({ loadingDescription: true });
        try
        {
            console.log(event);
            const {eventId: place_id, description_new: description } = event;
            const req = 
            {
                place_id,
                description
            };
            await editEventDescription(req);
            const events = [...this.state.events];
            const modal = {...this.state.modal};
            const index = events.findIndex(e => e.place_id === place_id);
            modal.description = modal.description_new;
            events[index].description = description;
            this.setState({ events, modal, loadingDescription: false });
        }
        catch(err)
        {
            this.setState({ loadingDescription: false });
            console.log(err);
        }
    }

    render() { 

        
        const { events, modal: event, loading, loadingDescription } = this.state;
        if(loading) return(
            <React.Fragment>
            <h3>Events</h3>
            <div className="text-center">
              <div className="spinner-border text-primary">
              <span className="sr-only">Loading...</span>
              </div>
            </div>
            </React.Fragment>
        );
        const { name, country, settlement, street } = this.state.filter;
        const { pageSize, currentPage } = this.state.pagination;
        const filteredEvents = filterEvents(events, name, country, settlement, street);
        const itemCount = filteredEvents.length;
        const newEvents = paginate(filteredEvents, currentPage, pageSize);

        return (<React.Fragment>
            <h3>Events</h3>
            <div className="input-group w-75 mb-2">
                <button className="btn btn-sm btn-primary mr-1">Add Event</button>
                <FilterInput 
                    value={name} 
                    onChange={this.handleFilterOnChange} 
                    name="name" placeholder="Filter Name" />
                <FilterInput 
                    value={country}
                    onChange={this.handleFilterOnChange}
                    name="country" 
                    placeholder="Filter Country" />
                <FilterInput 
                    value={settlement}
                    onChange={this.handleFilterOnChange} 
                    name="settlement" 
                    placeholder="Filter Settlement" />
                <FilterInput 
                    value={street}
                    onChange={this.handleFilterOnChange} 
                    name="street" 
                    placeholder="Filter Street" />
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
                  <th style={{width:"9%"}}>Price</th>
                  <th colSpan={2} className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                  {newEvents.map(event => 
                  <EventRaw
                    handleSaveEvent={this.handleSaveEvent}
                    handleDeleteEvent = {this.handleDeleteEvent}
                    key={event["place_id"]}
                    event={event}
                    handleValuesOnChange={this.handleValuesOnChange}
                    handleClickOnDescription={this.handleClickOnDescription}
                  />)}
              </tbody>
            </table>
            <EventDescriptionModal
                handleEditDescription={this.handleEditDescription}
                event={event}
                loading={loadingDescription}
                handleExitModal={this.handleExitDescriptionModal}
                handleOnChange={this.handleOnChangeModal}
               />
            <AdminPagination
                currentPage={currentPage}
                itemsCount={itemCount}
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
             />
          </React.Fragment>);
    }
}

 
export default AdminEvents;