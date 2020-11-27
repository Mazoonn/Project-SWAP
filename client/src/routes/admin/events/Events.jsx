import React, { Component } from 'react';
import { getEvents } from "../../../services/AdminServices";
import EventRaw from './EventsRaw';
import SearchLocationInput from './searchLocation';

class AdminEvents extends Component {
    state = 
    {
        events: [],
        address: {},
        loading: false,
    }

    handleSetAddress= (address)=>
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
        let { name, value } = e.target;
        if(name === "price" && parseFloat(value) < 0) return;
        events[index][`${name}_new`] = value;
        this.setState({ events });
    }

    render() { 
        const { events } = this.state;

        return (<React.Fragment>
            <h3>Events</h3>
            <div className="input-group w-75 mb-2">
                <button className="btn btn-sm btn-primary mr-1">Add Event</button>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter Name"
                    name="name"
                />
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter Country"
                    name="country" 
                />                
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter Settlement"
                    name="settlement" 
                />                
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Filter Street"
                    name="street" 
                />
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
                  {events.map(event => 
                  <EventRaw
                    key={event["place_id"]}
                    event={event}
                    handleValuesOnChange={this.handleValuesOnChange}
                  />)}
              </tbody>
            </table>
          </React.Fragment>);
    }
}

 
export default AdminEvents;